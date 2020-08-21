const { nanoid } = require('nanoid');
const MysqlLib = require('../lib/repository/MysqlLib')

const mysqlLib = new MysqlLib;

class SponsorService {
  constructor(){
    this.model='Sponsor'
  }

  async getSposors(){
    const sponsors = await mysqlLib.getAll(this.model);
    return sponsors || [];
  }

  /**
   * Create a user, this operate over two models
   * to implement a security layer at querys login
   */
  async createSponsor({ sponsor }) {
    const { id_sponsor, name_sponsor, url_sponsor, logo_sponsor } = sponsor;
    const createSponsorId = await mysqlLib.create(this.model,{
      id_sponsor: id_sponsor || nanoid(),
      name_sponsor,
      url_sponsor,
      logo_sponsor
    });

    return createSponsorId;
  }
}

module.exports = SponsorService;