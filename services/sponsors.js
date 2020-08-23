const MysqlLib = require('../lib/repository/MysqlLib');
const Sponsor = require('../lib/models/sponsor');

class SponsorService {
  constructor(){
    this.mysqlLib = new MysqlLib(Sponsor);
  }

  async getSponsor({ sponsorId }){
    const sponsor = await this.mysqlLib.get({id_sponsor : sponsorId});
    return sponsor || [];
  }

  async getSponsors(){
    const sponsors = await this.mysqlLib.getAll();
    return sponsors || [];
  }

  /**
   * Create a user, this operate over two models
   * to implement a security layer at querys login
   */
  async createSponsor({ sponsor }) {
    const { id_sponsor, name_sponsor, url_sponsor, logo_sponsor } = sponsor;
    const createSponsorId = await this.mysqlLib.create({
      name_sponsor,
      url_sponsor,
      logo_sponsor
    });

    return createSponsorId;
  }

  async updateSponsor({ sponsorId, sponsor }){
    const updateSponsor = await this.mysqlLib.update(sponsor, {id_sponsor : sponsorId});
    return updateSponsor || [];
  }

  async deleteSponsor({sponsorId}){
    const deleteSponsor = await this.mysqlLib.delete({id_sponsor : sponsorId})
    return deleteSponsor || [];
  }
}

module.exports = SponsorService;
