const { Sequelize } = require('sequelize');
const { config } = require('../../config');

const USER = config.dbUser;
const PASSWORD = config.dbPassword;
const NAME = config.dbName;
const HOST = config.dbHost;
const DIALECT = config.dbDialect;

const sequelize = new Sequelize(NAME, USER, PASSWORD, {
        host: HOST,
        dialect: DIALECT,
      });

module.exports = sequelize;
