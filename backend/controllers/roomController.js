const index = require("../index.js");
const { catchAsyncError } = require("../middlewares/catchAsyncError");
const { generateRandomId } = require("../utils/helper");

exports.getNewRoom = catchAsyncError((req, res, next) => {
  let id;
  do {
    id = generateRandomId(6);
  } while (!index.isRoomIdEmpty(id));

  res.status(200).json({
    success: true,
    id,
  });
});

exports.validateRoom = catchAsyncError((req, res, next) => {
  let { id } = req.body;
  if (index.validateRoomId(id)) {
    res.status(200).json({
      success: true,
      id,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "No such room exist",
    });
  }
});

exports.validateRoomToJoin = catchAsyncError((req, res, next) => {
  let { id } = req.body;
  if (index.validateRoomExist(id)) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(200).json({
      success: false,
      message: "No such room exist",
    });
  }
});
