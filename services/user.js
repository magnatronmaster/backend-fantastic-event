const bcrypt = require('bcrypt');
const MysqlLib = require('../lib/repository/MysqlLib');
const boom = require('@hapi/boom');
//Model
const User = require('../lib/models/user');

class UsersService {
  constructor() {
    this.mySql = new MysqlLib(User);
  }

  async GetUserByEmail(email_user) {
    const user = await this.mySql.get({ email_user });
    return user || [];
  }

  async GetUser() {
    try {
      const result = await this.mySql.getAll({}, ['id_user', 'email_user']);
      return result;
    } catch (error) {
      return error;
    }
  }

  async CreateUser({ user }) {
    try {
      const { email_user, password_user } = user;

      //Verify if email exist
      const userExists = await this.GetUserByEmail(email_user);
      if (userExists.id_user != undefined)
        throw boom.badRequest('email_user already exists');

      const hashedPassword = await bcrypt.hash(password_user, 10);
      const result = await this.mySql.create({
        email_user,
        password_user: hashedPassword,
      });
      return result.id_user;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UsersService;
