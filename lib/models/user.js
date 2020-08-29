const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');
const Organization = require('./organization');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email_user: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  password_user: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
});

User.hasMany(Organization, {
  as: 'Organizations',
  foreignKey: 'idUser',
  sourceKey: 'id_user',
});
Organization.belongsTo(User, {
  as: 'user',
  foreignKey: 'idUser',
  targetKey: 'id_user',
});

module.exports = User;
