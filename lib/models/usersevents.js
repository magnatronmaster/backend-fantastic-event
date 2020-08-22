const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');

const UserEvent = sequelize.define('users-events', {
  type_user: {
    type: DataTypes.ENUM('Administrador', 'Organizador'),
    allowNull: false,
  },
});

module.exports = UserEvent;
