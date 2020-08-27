const { DataTypes } = require('sequelize');
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
  },
  date_start_event: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_end_event: {
    type: DataTypes.DATE,
  },
  banner_event: {
    type: DataTypes.STRING(),
  },
  logo_event: {
    type: DataTypes.STRING(),
  },
  public_event: {
    type: DataTypes.BOOLEAN(),
  },
  url_event: {
    type: DataTypes.STRING(),
  },
  idOrg: {
    type: DataTypes.UUID,
  },
  idTemplate: {
    type: DataTypes.UUID,
  },
});

Event.hasMany(Schedule, {
  foreignKey: 'idEvent',
  sourceKey: 'id_event',
});

Event.hasMany(Register, {
  foreignKey: 'idEvent',
  sourceKey: 'id_event',
});

module.exports = Event;
