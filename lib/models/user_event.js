const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');
const User = require('./user');
const Event = require('./event');

const User_Event = sequelize.define('User_Event', {
  id_user_event: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type_user: {
    type: DataTypes.ENUM('Administrador', 'Organizador'),
  },
}, { timestamps: false });

User.belongsToMany(Event, {
  through: User_Event,
  foreignKey: 'idUser',
});
Event.belongsToMany(User, {
  through: User_Event,
  foreignKey: 'idEvent',
});

module.exports = User_Event;
