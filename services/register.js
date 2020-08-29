const MysqlLib = require('../lib/repository/MysqlLib');
const Register = require('../lib/models/register');

class RegisterService {
  constructor() {
    this.mysqlLib = new MysqlLib(Register);
  }

  async getRegisters({ idEvent }) {
    const registers = await this.mysqlLib.getAll({ id_event: idEvent });
    return registers || [];
  }

  async createRegister({ register }) {
    const result = await this.mysqlLib.create(register);

    return result.isBoom ? result : result.id_register;
  }
}

module.exports = RegisterService;
