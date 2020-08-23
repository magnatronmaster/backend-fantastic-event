const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email_user: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password_user: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = User;
