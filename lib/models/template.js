const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');
const Event = require('./event');

const Template = sequelize.define('Template', {
  id_template: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_template: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  primary_color_template: {
    type: DataTypes.STRING(),
  },
  secundary_color_template: {
    type: DataTypes.STRING(),
  },
  font_template: {
    type: DataTypes.STRING(),
  },
});

Template.hasMany(Event, {
  as: 'Events',
  foreignKey: 'id_template',
  sourceKey: 'id_template',
});
Event.belongsTo(Template, {
  as: 'Template',
  foreignKey: 'id_template',
  targetKey: 'id_template',
});

module.exports = Template;
