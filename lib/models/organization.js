const { DataTypes} = require('sequelize');
const sequelize = require('../repository/connection');

const Organization = sequelize.define('Organization', {
  id_org: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name_org: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description_org: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  id_user: {
    type: DataTypes.UUID,
  }
}, {});

module.exports= Organization;
