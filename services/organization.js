const MysqlLib = require('../lib/repository/MysqlLib');
const Organization = require('../lib/models/organization');
const { isBoom } = require('@hapi/boom');

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
    const result = await this.mysqlLib.create({
      name_org,
      description_org,
      idUser,
    });

    return result.id_org;
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
