const bcrypt = require('bcrypt');
const MysqlLib = require('../lib/repository/MysqlLib');
const boom = require('@hapi/boom');
//Model
const User = require('../lib/models/user');
const Organization = require('../lib/models/organization');
const Organizer = require('../lib/models/organizer');
const Event = require('../lib/models/event');

class UsersService {
  constructor() {
    this.mySql = new MysqlLib(User);
    this.join = [{ model: Organization, as: 'Organizations' }];
  }

  async GetUserByEmail(email_user) {
    const user = await this.mySql.get({ email_user });
    return user || [];
  }

  async GetUser(id_user) {
    try {
      const result = await this.mySql.get({ id_user }, this.join, [
        'id_user',
        'email_user',
      ]);

      const email_user = result.email_user;

      //Query the events where you have been invited as an organizer
      const events_organizer = await Organizer.findAll({
        where: { email_organizer: email_user },
        include: { model: Event, as: 'Event' },
      });

      const events = events_organizer.map((item) => item.Event);

      const user = {
        id_user: result.id_user,
        email_user: result.email_user,
        Organizations: result.Organizations,
        events_organizer: events,
      };

      return user;
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
