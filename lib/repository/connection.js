const { Sequelize } = require('sequelize');
const { config } = require('../../config');

const USER = config.dbUser;
const PASSWORD = config.dbPassword;
const NAME = config.dbName;
const HOST = config.dbHost;
const DIALECT = config.dbDialect;
const PORT = config.dbPort;

const sequelize = new Sequelize(NAME, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  port: PORT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
