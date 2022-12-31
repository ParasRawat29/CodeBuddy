const jwt = require("jsonwebtoken");

const getJWTToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

const sendToken = (req, res, statusCode, id, name) => {
  const token = getJWTToken(id);
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    name: name,
    email: id,
    token,
  });
};

module.exports = {
  getJWTToken,
  sendToken,
};
