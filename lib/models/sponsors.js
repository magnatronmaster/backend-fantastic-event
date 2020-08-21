const { DataTypes, Model } = require('sequelize');
const sequelize = require('../mysql')

const Sponsor = sequelize.define('Sponsor', {
  // Model attributes are defined here
  id_sponsor: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name_sponsor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url_sponsor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo_sponsor: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  id: false,
  timestamps: false
});

module.exports= Sponsor;
