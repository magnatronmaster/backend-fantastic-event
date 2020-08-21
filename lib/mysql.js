const { Sequelize } = require('sequelize');
const { config } = require('../config');

const USER = config.dbUser;
const PASSWORD = config.dbPassword;
const NAME = config.dbName;
const HOST = config.dbHost;
const DIALECT = config.dbDialect;

class MysqlLib {
  constructor() {
    this.handleCon();
  }

  // Singleton implementation to connect database
  handleCon() {
    if (!MysqlLib.connection) {
      MysqlLib.connection = new Sequelize(NAME, USER, PASSWORD, {
        host: HOST,
        dialect: DIALECT,
      });

      MysqlLib.connection.authenticate()
        .then(() => {
          console.log('[DB] Success contected');
        })
        .catch((reject) => {
          console.log(`[DB] fail contected ${reject}`);
        });
    }
    return MysqlLib.connection;
  }

  // async create(model, data) {
  //   console.log(model)
  //   console.log(data)
  //   try {
  //     const createdData = await model.create(data);
  //     return createdData;
  //   } catch (error) {
  //     return error;
  //   }
  // }
}

module.exports = MysqlLib;
