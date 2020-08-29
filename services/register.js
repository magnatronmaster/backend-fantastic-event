const MysqlLib = require('../lib/repository/MysqlLib');
const Register = require('../lib/models/register');
const boom = require('@hapi/boom');
class RegisterService {
  constructor() {
    this.mysqlLib = new MysqlLib(Register);
  }

  async getRegisters({ idEvent }) {
    const registers = await this.mysqlLib.getAll({ id_event: idEvent });
    return registers || [];
  }

  async createRegister({ register }) {
    const { email_register } = register;
    //Verify if user already register
    const exist = await this.mysqlLib.get({ email_register });

    if (exist != null)
      throw boom.badRequest('email has already been registered');

    const result = await this.mysqlLib.create(register);

    return result.isBoom ? result : result.id_register;
  }
}

module.exports = RegisterService;
