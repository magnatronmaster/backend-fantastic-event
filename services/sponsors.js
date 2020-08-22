const { Sequelize } = require('sequelize');
const { nanoid } = require('nanoid');
const MysqlLib = require('../lib/repository/MysqlLib');
const Sponsor = require('../lib/models/sponsors');
const sequelize = require('../lib/repository/connection');

class SponsorService {
  constructor(){
    this.model= Sponsor(sequelize, Sequelize);
    this.mysqlLib = new MysqlLib;
  }

  async getSponsor({ sponsorId }){
    const sponsor = await this.mysqlLib.get(this.model, {id_sponsor : sponsorId});
    return sponsor || [];
  }

  async getSponsors(){
    const sponsors = await this.mysqlLib.getAll(this.model);
    return sponsors || [];
  }

  /**
   * Create a user, this operate over two models
   * to implement a security layer at querys login
   */
  async createSponsor({ sponsor }) {
    const { id_sponsor, name_sponsor, url_sponsor, logo_sponsor } = sponsor;
    const createSponsorId = await this.mysqlLib.create(this.model,{
      id_sponsor: id_sponsor || nanoid(),
      name_sponsor,
      url_sponsor,
      logo_sponsor
    });

    return createSponsorId;
  }

  async updateSponsor({ sponsorId, sponsor }){
    const updateSponsor = await this.mysqlLib.update(this.model, sponsor, {id_sponsor : sponsorId});
    return updateSponsor || [];
  }

  async deleteSponsor({sponsorId}){
    const deleteSponsor = await this.mysqlLib.delete(this.model, {id_sponsor : sponsorId})
    return deleteSponsor || [];
  }
}

module.exports = SponsorService;