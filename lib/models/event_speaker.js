const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');
const Event = require('./event');
const Speaker = require('./speaker');

const Event_Speaker = sequelize.define('Event_Speaker', {},{
  timestamps: false,
});

Speaker.belongsToMany(Event, {
  through: Event_Speaker,
  foreignKey: 'idSpeaker', 
});
Event.belongsToMany(Speaker, {
  through: Event_Speaker,
  foreignKey: 'idEvent',
});

module.exports = Event_Speaker;
