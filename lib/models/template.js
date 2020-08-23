const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');
const Event = require('./event');

const Template = sequelize.define('Template', {
  id_template: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_teplate: {
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
  foreignKey: 'idTemplate',
  sourceKey: 'id_template'
});

module.exports = Template;
