const MysqlLib = require('../lib/repository/MysqlLib');
const Sponsor = require('../lib/models/sponsor');

class SponsorService {
  constructor() {
    this.mysqlLib = new MysqlLib(Sponsor);
  }

  async getSponsor(id_sponsor) {
    const sponsor = await this.mysqlLib.get({ id_sponsor });
    return sponsor || [];
  }

  async getSponsors(id_event) {
    const sponsors = await this.mysqlLib.getAll({ id_event });
    return sponsors || [];
  }

  /**
   * Create a Sponsor
   */
  async createSponsor({ sponsor }) {
    const result = await this.mysqlLib.create(sponsor);

    return result.id_sponsor;
  }

  async updateSponsor(id_sponsor, sponsor) {
    const updatedSponsor = await this.mysqlLib.update(sponsor, id_sponsor);
    return updatedSponsor || [];
  }

  async deleteSponsor(id_sponsor) {
    const deletedSponsor = await this.mysqlLib.delete({ id_sponsor });
    return deletedSponsor || [];
  }
}

module.exports = SponsorService;
