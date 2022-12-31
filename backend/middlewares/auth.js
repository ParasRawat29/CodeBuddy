const ErrorHandler = require("../utils/Errorhandler");
const { verify } = require("jsonwebtoken");
const User = require("../model/user");

const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(new ErrorHandler("login to access this resource", 401));
    }
    const decodedData = verify(token, process.env.JWT_SEC);

    const user = await User.findOne({
      where: {
        email: decodedData.id,
      },
      attributes: ["name", "email", "id"],
    });
    if (!user) {
      return next(new ErrorHandler("login to access this resource", 401));
    }

    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorHandler(err, err.status));
  }
};

module.exports = {
  isAuthenticated,
};
