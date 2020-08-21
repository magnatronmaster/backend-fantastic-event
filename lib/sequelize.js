const Sequelize = require('sequelize');
const { config } = require('../config');
const { v4: uuidv4 } = require('uuid');
const USER = config.dbUser;
const PASSWORD = config.dbPassword;
const NAME = config.dbName;
const HOST = config.dbHost;
const DIALECT = config.dbDialect;
const PORT = config.dbPort;

//Models
const UserModel = require('../models/users');

const sequelize = new Sequelize(NAME, USER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);

  User.bulkCreate([
    {
      id_user: uuidv4(),
      email_user: 'julianbuilesc@gmail.com',
      password_user: '123456',
    },
  ]);
});

module.exports = {
  User,
};
