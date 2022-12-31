const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_ROOT,
  process.env.DB_PASS,
  {
    dialect: "mysql",
    host: "127.0.0.1",
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;
