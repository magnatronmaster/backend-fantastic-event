const MysqlLib = require('../lib/repository/MysqlLib');
const Event = require('../lib/models/event');
const Schedule = require('../lib/models/schedule');
const Organization = require('../lib/models/organization');
const Sponsor = require('../lib/models/sponsor');
const Speaker = require('../lib/models/speaker');
const Register = require('../lib/models/register');
class EventService {
  constructor() {
    this.mysqlLib = new MysqlLib(Event);
    this.joins = [
      { model: Organization, as: 'Organization' },
      { model: Schedule, as: 'Schedules' },
      { model: Sponsor, as: 'Sponsors' },
      { model: Speaker, as: 'Speakers' },
    ];
  }

  async getEvent(id_event) {
    const result = await this.mysqlLib.get({ id_event }, this.joins);
    return result || [];
  }

  async getEvents(id_org) {
    const result = await this.mysqlLib.getAll(
      { idOrg: id_org },
      {},
      this.joins
    );
    return result || [];
  };

  async getEventsMail(where) {
    const result = await this.mysqlLib.getAll(
      where,
      {},
      [{ model: Register, as: 'Registers' }],
    );
    return result || [];
  };

  async createEvent({ event }) {
    const result = await this.mysqlLib.create(event);

    return result.id_event;
  }

  async updateEvent(id_event, event) {
    const result = await this.mysqlLib.update(event, id_event);
    return result || [];
  }

  async deleteEvent(id_event) {
    const result = await this.mysqlLib.delete({ id_event });
    return result || [];
  }
}

module.exports = EventService;
