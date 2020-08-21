class MysqlLib {
  constructor(){
    this.schemas = {
      Sponsor: require('../models/sponsors'),
    };
  }

  createModel(collection) {
    const Model = this.schemas[collection];
    return Model;
  }

  async create(model, data){
    const Model = this.createModel(model);
    try {
      const created = await Model.create(data);
      return created;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MysqlLib;