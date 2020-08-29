const { DataTypes } = require('sequelize');
const sequelize = require('../repository/connection');

const Sponsor = sequelize.define(
  'Sponsor',
  {
    // Model attributes are defined here
    id_sponsor: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name_sponsor: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    url_sponsor: {
      type: DataTypes.STRING(100),
    },
    logo_sponsor: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {}
);

module.exports = Sponsor;
