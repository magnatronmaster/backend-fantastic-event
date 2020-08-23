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
   * Create a Sponsor
   */
  async createSponsor({ sponsor }) {
    const { name_sponsor, url_sponsor, logo_sponsor } = sponsor;
    const createdSponsorId = await this.mysqlLib.create({
      name_sponsor,
      url_sponsor,
      logo_sponsor
    });

    return createdSponsorId;
  }

  async updateSponsor({ sponsorId, sponsor }){
    const updatedSponsor = await this.mysqlLib.update(sponsor, {id_sponsor : sponsorId});
    return updatedSponsor || [];
  }

  async deleteSponsor({sponsorId}){
    const deletedSponsor = await this.mysqlLib.delete({id_sponsor : sponsorId})
    return deletedSponsor || [];
  }
}

module.exports = SponsorService;
