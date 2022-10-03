const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("peerCoding", "root", "rawat987", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
