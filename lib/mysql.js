class MysqlLib {
  constructor() {}

  async getAll(model) {
    try {
      const listData = await model.findAll();
      return listData;
    } catch (error) {
      return error;
    }
  }

  async Create(model, data) {
    try {
      const Data = await model.create(data);
      return Data;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MysqlLib;
