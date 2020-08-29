const MysqlLib = require('../lib/repository/MysqlLib');
const Schedule = require('../lib/models/schedule');
const Speaker = require('../lib/models/speaker');

class ScheduleService {
  constructor() {
    this.mysqlLib = new MysqlLib(Schedule);
    this.join = [{ model: Speaker, as: 'Speaker' }];
  }

  async getSchedule(id_schedule) {
    const result = await this.mysqlLib.get({ id_schedule }, this.join);
    return result || [];
  }

  async getSchedules(id_event) {
    const result = await this.mysqlLib.getAll({ id_event }, {}, this.join);
    return result || [];
  }

  async createSchedule({ schedule }) {
    const result = await this.mysqlLib.create(schedule);

    return result.isBoom ? result : result.id_schedule;
  }

  async updateScheule(id_schedule, schedule) {
    const result = await this.mysqlLib.update(schedule, id_schedule);
    return result || [];
  }

  async deleteSchedule(id_schedule) {
    const result = await this.mysqlLib.delete({ id_schedule });
    return result || [];
  }
}

module.exports = ScheduleService;
