const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');
const Event = require('./event');

const Organization = sequelize.define(
  'Organization',
  {
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
  },
  {}
);

Organization.hasMany(Event, {
  as: 'Events',
  foreignKey: 'idOrg',
  sourceKey: 'id_org',
});
Event.belongsTo(Organization, {
  as: 'Organization',
  foreignKey: 'idOrg',
  sourceKey: 'id_org',
});

module.exports = Organization;
