const MysqlLib = require('../lib/repository/MysqlLib');
const Event = require('../lib/models/event');

class EventService {
  constructor() {
    this.mysqlLib = new MysqlLib(Event);
  }

  async getEvent(id_event) {
    const result = await this.mysqlLib.get({ id_event });
    return result || [];
  }

  async getEvents(id_org) {
    const result = await this.mysqlLib.getAll({ idOrg: id_org });
    return result || [];
  }

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
