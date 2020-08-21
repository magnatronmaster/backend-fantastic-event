const Sponsor = require('../lib/models/sponsors')

class SponsorService {
  constructor() {
  }
  /**
   * Create a user, this operate over two models
   * to implement a security layer at querys login
   */
  async createSponsor({ sponsor }) {
    const { name_sponsor, url_sponsor, logo_sponsor } = sponsor;
    console.log(name_sponsor)
    console.log(url_sponsor)
    console.log(logo_sponsor)

    const createSponsorId = await Sponsor.create({
      id: 1,
      name_sponsor,
      url_sponsor,
      logo_sponsor
    });

    return createSponsorId;
  }
}

module.exports = SponsorService;