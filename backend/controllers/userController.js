const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../model/user");
const ErrorHandler = require("../utils/Errorhandler");
const { sendToken } = require("../utils/jwtToken");

exports.signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("enter email and password", 400));
  }
  const user = await User.findAll({
    where: {
      email: email,
    },
  });

  if (user.length === 0) {
    return next(new ErrorHandler("Wrong email or password", 401));
  }
  if (!(password === user[0].password)) {
    return next(new ErrorHandler("Wrong email or password", 401));
  }

  sendToken(req, res, 200, user[0].email, user[0].name);
});

exports.register = catchAsyncError(async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return next(new ErrorHandler("enter email , password , name", 400));
  }
  const user = await User.findAll({
    where: {
      email: email,
    },
  });
  if (user.length > 0) {
    return next(new ErrorHandler("user alerady exists with this email", 409));
  }

  User.create({
    name: name,
    email: email,
    password: password,
  }).then((result) => {
    sendToken(req, res, 201, result.email, result.name);
  });
});

exports.logout = catchAsyncError(async (req, res, next) => {
  console.log("req here", req);
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  console.log("here");

  res.status(200).json({
    success: true,
    message: "Logout Succesful",
  });
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
    attributes: ["name", "email", "createdAt"],
  });
  res.status(200).json({ success: true, user });
});
