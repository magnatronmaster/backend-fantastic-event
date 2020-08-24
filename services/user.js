const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const MysqlLib = require('../lib/repository/MysqlLib');

//Model
const User = require('../lib/models/user');

class UsersService {
  constructor() {
    this.mySql = new MysqlLib();
  }

  async GetUserByEmail({ email_user }) {
    const user = await this.mysqlLib.get({ email_user: email_user });
    return user || [];
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
      console.log(user);
      const hashedPassword = await bcrypt.hash(password_user, 10);
      const result = await this.mySql.create(User, {
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
