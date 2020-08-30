const MysqlLib = require('../lib/repository/MysqlLib');
const Organizer = require('../lib/models/organizer');

class OrganizerService {
  constructor() {
    this.mysqlLib = new MysqlLib(Organizer);
  }

  async getOrganizer(id_organizer) {
    const organizer = await this.mysqlLib.get({ id_organizer });
    return organizer || [];
  }

  async getOrganizers(id_event) {
    const organizers = await this.mysqlLib.getAll({ id_event });
    return organizers || [];
  }

  /**
   * Create a Organizer
   */
  async createOrganizer({ organizer }) {
    try {
      const { email_organizers, id_event } = organizer;
      email_organizers.forEach(async (email_organizer) => {
        //Verify if email is already in the event
        const exist = await this.mysqlLib.get({ email_organizer, id_event });

        if (exist === null)
          await this.mysqlLib.create({ email_organizer, id_event });
      });
      return 'succes';
    } catch (error) {
      return error;
    }
  }

  async updateOrganizer(id_organizer, organizer) {
    const updatedOrganizer = await this.mysqlLib.update(
      organizer,
      id_organizer
    );
    return updatedOrganizer || [];
  }

  async deleteOrganizer(id_organizer) {
    const deletedOrganizer = await this.mysqlLib.delete({ id_organizer });
    return deletedOrganizer || [];
  }
}

module.exports = OrganizerService;
