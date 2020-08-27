class MysqlLib {
  constructor(model) {
    this.model = model;
  }

  async get(query) {
    try {
      const item = await this.model.findOne({ where: query });
      return item;
    } catch (error) {
      return error;
    }
  }

  async getAll(query, attributes) {
    try {
      const listData = await this.model.findAll({
        attributes: attributes,
        where: query,
      });
      return listData;
    } catch (error) {
      return error;
    }
  }

  async create(data) {
    try {
      const created = await this.model.create(data);
      return created;
    } catch (error) {
      return error;
    }
  }

  async update(data, query) {
    try {
      const updated = await this.model.update(data, { where: query });
      const resulst = await this.model.findOne({ where: query });
      return resulst;
    } catch (error) {
      return error;
    }
  }

  async delete(query) {
    try {
      const deleted = await this.model.destroy({ where: query });
      return deleted;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MysqlLib;
