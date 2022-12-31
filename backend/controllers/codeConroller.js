const { generateFile } = require("../utils/generateFile");
const { executePython } = require("../utils/execPython");
const executeJs = require("../utils/execJs");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/Errorhandler");
const Codes = require("../model/code");
const { paginate } = require("../utils/paginate");

exports.runCode = catchAsyncError(async (req, res, next) => {
  const { language = "py", code } = req.body;
  if (!code || code == "") {
    return res.json({ success: false, error: "empty Code body" }).status(400);
  }

  try {
    const filePath = await generateFile(language, code);
    let output;
    switch (language) {
      case "py":
        output = await executePython(filePath);
        break;
      case "js":
        output = await executeJs(filePath);
      default:
        break;
    }
    return res.status(200).json({ filePath, output });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

exports.saveCode = catchAsyncError(async (req, res, next) => {
  const { code, fileName, language } = req.body;
  if (!code) return next(new ErrorHandler("no code to save", 400));
  if (!fileName) return next(new ErrorHandler("enter filename", 400));
  if (!language) return next(new ErrorHandler("select a language", 400));

  Codes.create({
    code,
    fileName,
    userId: req.user.id,
    language,
  })
    .then((_) => {
      res.status(200).json({
        success: true,
        message: "code saved",
      });
    })
    .catch((err) => {
      console.log(err);
      return next(new ErrorHandler(err.message, 400));
    });
});

exports.getSingleCode = catchAsyncError(async (req, res, next) => {
  const codeId = req.params.codeId;
  if (!codeId) return;
  const code = await Codes.findByPk(codeId);
  if (!code) return next(new ErrorHandler("No Code Found", 401));
  res.status(200).json({ success: true, code });
});

exports.getAllCode = catchAsyncError(async (req, res, next) => {
  const { keyword, page, limit, language } = req.query;
  let search = {
    where: {
      userId: req.user.id,
    },
  };

  if (keyword) {
    search = {
      where: {
        fileName: {
          [Op.like]: `%${keyword}%`,
        },
      },
    };
  }
  if (language) {
    search.where.language = language;
  }

  const codes = await paginate(Codes, search, page, limit);
  res.status(200).json({
    success: true,
    codes,
  });
});

exports.saveFileName = catchAsyncError(async (req, res, next) => {});
