const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');
const Event = require('./event');
const Sponsor = require('./sponsor');

const Event_Sponsor = sequelize.define('Event_Sponsor', {
  id_event_sponsor: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, { timestamps: false });

Sponsor.belongsToMany(Event, {
  through: Event_Sponsor,
  foreignKey: 'idSponsor', 
});
Event.belongsToMany(Sponsor, {
  through: Event_Sponsor,
  foreignKey: 'idEvent',
});

module.exports = Event_Sponsor;
