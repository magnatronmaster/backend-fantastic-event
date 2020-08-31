const MysqlLib = require('../lib/repository/MysqlLib');
const Register = require('../lib/models/register');
const EventService = require('./event');
const emailCompose = require('../utils/mail/registerMail');
const boom = require('@hapi/boom');
class RegisterService {
  constructor() {
    this.mysqlLib = new MysqlLib(Register);
    this.event = new EventService()
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
    if(result.isBoom){
      return result
    }else{
      const {id_event, name_register, email_register} = register;
      const {name_event, date_start_event }= await this.event.getEvent(id_event)
      emailCompose(name_register, email_register, name_event, date_start_event);
      return result.id_register
    }
  }
}

module.exports = RegisterService;
