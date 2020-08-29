const MysqlLib = require('../lib/repository/MysqlLib');
const Speaker = require('../lib/models/speaker');

class SpeakerService {
  constructor() {
    this.mysqlLib = new MysqlLib(Speaker);
  }

  async getSpeaker(id_speaker) {
    const result = await this.mysqlLib.get({ id_speaker });
    return result || [];
  }

  async getSpeakers(id_event) {
    const result = await this.mysqlLib.getAll({ idOrg: id_event });
    return result || [];
  }

  async createSpeaker({ speaker }) {
    const result = await this.mysqlLib.create(speaker);

    return result.id_event;
  }

  async updateSpeaker(id_speaker, speaker) {
    const result = await this.mysqlLib.update(speaker, id_speaker);
    return result || [];
  }

  async deleteSpeaker(id_speaker) {
    const result = await this.mysqlLib.delete({ id_speaker });
    return result || [];
  }
}

module.exports = SpeakerService;
