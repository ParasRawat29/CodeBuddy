const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../model/user");
const ErrorHandler = require("../utils/Errorhandler");
const { sendToken } = require("../utils/jwtToken");

exports.signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("enter email and password", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Wrong email or password", 401));
  }
  if (!(password === user.password)) {
    return next(new ErrorHandler("Wrong email or password", 401));
  }

  sendToken(req, res, 200, user.email, user.name);
});

exports.register = catchAsyncError(async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return next(new ErrorHandler("enter email , password , name", 400));
  }
  const user = await User.findOne({ email: email });
  if (user) {
    return next(new ErrorHandler("user alerady exists with this email", 409));
  }

  const result = await User.create({
    name: name,
    email: email,
    password: password,
  });
  sendToken(req, res, 201, result.email, result.name);
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
  const user = await User.findById(
    { _id: req.user.id },
    "name email createdAt"
  );
  res.status(200).json({ success: true, user });
});
