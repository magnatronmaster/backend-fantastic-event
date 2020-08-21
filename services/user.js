const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const MysqlLib = require('../lib/mysql');

//Model
const { User } = require('../lib/sequelize');

class UsersService {
  constructor() {
    this.mySql = new MysqlLib();
  }

  async GetUser() {
    try {
      const result = await this.mySql.getAll(User);
      return result;
    } catch (error) {
      return error;
    }
  }

  async CreateUser({ user }) {
    try {
      const { email_user, password_user } = user;
      const hashedPassword = await bcrypt.hash(password_user, 10);
      const result = await this.mySql.Create(User, {
        email_user,
        password_user: hashedPassword,
        id_user: uuidv4(),
      });
      return result.id_user;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UsersService;
