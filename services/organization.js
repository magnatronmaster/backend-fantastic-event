const MysqlLib = require('../lib/repository/MysqlLib');
const Organization = require('../lib/models/organization');

class OrganizationService {
  constructor() {
    this.mysqlLib = new MysqlLib(Organization);
  }

  async getOrganization({ id_org }) {
    const organization = await this.mysqlLib.get(id_org);
    return organization || [];
  }

  async getOrganizations() {
    const organizations = await this.mysqlLib.getAll();
    return organizations || [];
  }

  async createOrganization({ organization }) {
    const { name_org, description_org, idUser } = organization;
    const createdOrganizationId = await this.mysqlLib.create({
      name_org,
      description_org,
      idUser,
    });

    return createdOrganizationId;
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
