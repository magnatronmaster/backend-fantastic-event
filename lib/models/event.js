const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');
const Schedule = require('./schedule');
const Register = require('./register');
const Speaker = require('./speaker');
const Sponsor = require('./sponsor');
const Organizer = require('./organizer');

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
});

Event.hasMany(Schedule, {
  as: 'Schedules',
  foreignKey: 'id_event',
  sourceKey: 'id_event',
});
Schedule.belongsTo(Event, {
  as: 'Event',
  foreignKey: 'id_event',
  targetKey: 'id_event',
});

Event.hasMany(Register, {
  as: 'Registers',
  foreignKey: 'id_event',
  sourceKey: 'id_event',
});
Register.belongsTo(Event, {
  as: 'Event',
  foreignKey: 'id_event',
  targetKey: 'id_event',
});

Event.hasMany(Speaker, {
  as: 'Speakers',
  foreignKey: 'id_event',
  sourceKey: 'id_event',
});
Speaker.belongsTo(Event, {
  as: 'Event',
  foreignKey: 'id_event',
  targetKey: 'id_event',
});

Event.hasMany(Sponsor, {
  as: 'Sponsors',
  foreignKey: 'id_event',
  sourceKey: 'id_event',
});
Sponsor.belongsTo(Event, {
  as: 'Event',
  foreignKey: 'id_event',
  targetKey: 'id_event',
});

Event.hasMany(Organizer, {
  as: 'Organizers',
  foreignKey: 'id_event',
  sourceKey: 'id_event',
});
Organizer.belongsTo(Event, {
  as: 'Event',
  foreignKey: 'id_event',
  targetKey: 'id_event',
});

module.exports = Event;
