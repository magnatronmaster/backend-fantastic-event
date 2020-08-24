const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');
const Schedule = require('./schedule');
const Register = require('./register');

const Event = sequelize.define('Event', {
  id_event: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_event: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description_event: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  location_event: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  date_start_event: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_end_event: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  banner_event: {
    type: DataTypes.STRING(),
    allowNull: false,},
  logo_event: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  idOrg: {
    type: DataTypes.UUID,
  },
  idTemplate: {
    type: DataTypes.UUID,
  },
});

Event.hasMany(Schedule, {
  foreignKey: 'idEvents',
  sourceKey: 'id_event'
});

Event.hasMany(Register, {
  foreignKey: 'idEvents',
  sourceKey: 'id_event'
});

module.exports = Event;
