const MysqlLib = require('../lib/repository/MysqlLib');
const Organization = require('../lib/models/organization');
const Event = require('../lib/models/event');

class OrganizationService {
  constructor() {
    this.mysqlLib = new MysqlLib(Organization);
    this.join = [{ model: Event, as: 'Events' }];
  }

  async getOrganization({ id_org }) {
    const organization = await this.mysqlLib.get({ id_org }, this.join);
    return organization || [];
  }

  async getOrganizations() {
    const organizations = await this.mysqlLib.getAll();
    return organizations || [];
  }

  async createOrganization({ organization }) {
    const result = await this.mysqlLib.create(organization);
    return result.isBoom ? result : result.id_org;
  }

  async updateOrganization({ organizationId, organization }) {
    const updatedOrganization = await this.mysqlLib.update(organization, {
      id_org: organizationId,
    });
    return updatedOrganization || [];
  }

  async deleteOrganization({ organizationId }) {
    const deletedOrganization = await this.mysqlLib.delete({
      id_org: organizationId,
    });
    return deletedOrganization || [];
  }
}

module.exports = OrganizationService;
