const ErrorHandler = require("../utils/Errorhandler");
const { verify } = require("jsonwebtoken");
const User = require("../model/user");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("login to access this resource", 401));
  }
  const decodedData = verify(token, process.env.JWT_SEC);

  const user = await User.findOne({
    where: {
      id: decodedData.id,
    },
    attributes: ["name", "email", "id"],
  });
  if (!user) {
    return next(new ErrorHandler("login to access this resource", 401));
  }

  req.user = user;
  next();
};

module.exports = {
  isAuthenticated,
};
