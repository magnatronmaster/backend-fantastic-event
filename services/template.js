const MysqlLib = require('../lib/repository/MysqlLib');
const Template = require('../lib/models/template');

class TemplateService {
  constructor(){
    this.mysqlLib = new MysqlLib(Template);
  };

  async getTemplate({ id_template }){
    const template = await this.mysqlLib.get({ id_template });
    return template || [];
  };

  async getTemplates(){
    const templates = await this.mysqlLib.getAll();
    return templates || [];
  };

  async createTemplate({ template }) {
    const { name_template,
            primary_color_template,
            secundary_color_template,
            font_template,
          } = template;
    const createdTemplateId = await this.mysqlLib.create({
      name_template,
      primary_color_template,
      secundary_color_template,
      font_template,
    });

    return createdTemplateId;
  }

  async updateTemplate({ id_template, template }){
    const updatedSponsor = await this.mysqlLib.update(template, { id_template });
    return updatedSponsor || [];
  }

  async deleteTemplate({id_template}){
    const deletedSponsor = await this.mysqlLib.delete({ id_template })
    return deletedSponsor || [];
  }
}

module.exports = TemplateService;