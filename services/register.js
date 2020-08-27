const MysqlLib = require('../lib/repository/MysqlLib');
const Register = require('../lib/models/register');

class RegisterService {
  constructor(){
    this.mysqlLib = new MysqlLib(Register);
  }

  async getRegisters({ idEvent }){
    const registers = await this.mysqlLib.getAll({ idEvent });
    return registers || [];
  }

  async createRegister({ register }) {
    const { email_register, idEvent } = register;
    const createdRegisterId = await this.mysqlLib.create({
      email_register,
      idEvent,
    });

    return createdRegisterId;
  }
};

module.exports = RegisterService;
