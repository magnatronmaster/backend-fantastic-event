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

  async get(model, query){
    console.log(model)
    console.log(id)
    const Model = this.createModel(model);
    try {
      const item = await Model.findOne({where: {query}})
      return item;
    } catch (error) {
      return error;
    }
  }

  async getAll(model) {
    const Model = this.createModel(model);
    try {
      const listData = await Model.findAll();
      return listData;
    } catch (error) {
      return error;
    }
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