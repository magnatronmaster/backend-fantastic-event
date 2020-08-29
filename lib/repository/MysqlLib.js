const boom = require('@hapi/boom');

class MysqlLib {
  constructor(model) {
    this.model = model;
  }

  async get(query, entity) {
    try {
      const item = await this.model.findOne({ where: query, include: entity });
      return item;
    } catch (error) {
      return boom.badRequest(error);
    }
  }

  async getAll(query, attributes, entity) {
    try {
      const listData = await this.model.findAll({
        attributes: attributes,
        where: query,
        include: entity,
      });
      return listData;
    } catch (error) {
      return boom.badRequest(error);
    }
  }

  async create(data) {
    try {
      const created = await this.model.create(data);
      return created;
    } catch (error) {
      return boom.badRequest(error);
    }
  }

  async update(data, query) {
    try {
      const updated = await this.model.update(data, { where: query });

      if (updated[0] === 0) return boom.badRequest('Data invalid');

      const result = await this.model.findOne({ where: query });
      return result;
    } catch (error) {
      return boom.badRequest(error);
    }
  }

  async delete(query) {
    try {
      const deleted = await this.model.destroy({ where: query });
      return deleted;
    } catch (error) {
      return boom.badRequest(error);
    }
  }
}

module.exports = MysqlLib;
