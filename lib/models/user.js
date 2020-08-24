const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');
const Organization = require('./organization')

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

User.hasMany(Organization, {
  foreignKey: 'idUser',
  sourceKey: 'id_user'
});

module.exports = User;
