class MysqlLib {
  constructor(){
  }

  async get(model, query){
    try {
      const item = await model.findOne({where: query})
      return item;
    } catch (error) {
      return error;
    }
  }

  async getAll(model, query) {
    try {
      const listData = await model.findAll({where: query});
      console.log(listData)
      return listData;
    } catch (error) {
      return error;
    }
  }

  async create(model, data){
    try {
      const created = await model.create(data);
      return created;
    } catch (error) {
      return error;
    }
  }

  async update(model, data, query){
    try {
      const updated = await model.update( data, {where: query});
      return updated;
    } catch (error) {
      return error;
    }
  }

  async delete(model, query){
    try {
      const deleted = await model.destroy({where: query})
      return deleted;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MysqlLib;