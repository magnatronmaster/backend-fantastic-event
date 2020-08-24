const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');
const User = require('./users');

const Organization = sequelize.define('organizations', {
  id_org: {
    type: DataTypes.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true,
  },
  name_org: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description_org: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

Organization.belongsTo(User, {
  foreignKey: 'id_user',
  as: 'user',
});

module.exports = Organization;
