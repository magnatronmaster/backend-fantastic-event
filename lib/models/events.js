const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');

const Organization = require('./organizations');
const User = require('./users');
const UserEvent = require('./usersevents');

const Event = sequelize.define('events', {
  id_event: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
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
    type: DataTypes.DATE(),
    allowNull: false,
  },
  date_end_event: {
    type: DataTypes.DATE(),
    allowNull: false,
  },
  banner_event: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  logo_event: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
});

// Event.belongsTo(Organization, {
//   foreignKey: 'id_org',
//   as: 'organizations',
// });

// Event.belongsToMany(User, {
//   through: UserEvent,
//   unique: false,
//   foreignKey: 'id_user',
// });

module.exports = Event;
