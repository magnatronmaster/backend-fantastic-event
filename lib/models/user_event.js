const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');
const User = require('./user');
const Event = require('./event');

const User_Event = sequelize.define(
  'User_Event',
  {
    type_user: {
      type: DataTypes.ENUM('Administrador', 'Organizador'),
    },
  },
  { timestamps: false }
);

User.belongsToMany(Event, {
  through: User_Event,
  foreignKey: 'id_user',
});

Event.belongsToMany(User, {
  through: User_Event,
  foreignKey: 'id_event',
});

module.exports = User_Event;
