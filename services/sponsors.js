const MysqlLib = require('../lib/mysql');

class SponsorService {
  constructor() {
    this.SponsorModel = 'Sponsor';
    this.mysqlDb = new MysqlLib();
  }

  /**
   * Create a user, this operate over two models
   * to implement a security layer at querys login
   */
  async createSponsor({ sponsor }) {
    console.log(sponsor)
    const { name_sponsor, url_sponsor, logo_sponsor } = sponsor;
    const createUserId = await this.mysqlDb.create(this.SponsorModel, {
      name_sponsor,
      url_sponsor,
      logo_sponsor
    });

    return createUserId;
  }
}

module.exports = SponsorService;