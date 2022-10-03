const jwt = require("jsonwebtoken");

const getJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

const sendToken = (req, res, statusCode, id) => {
  const token = getJWTToken(id);
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports = {
  getJWTToken,
  sendToken,
};
