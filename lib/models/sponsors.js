const { DataTypes, Model } = require('sequelize');
const sequelize = require('../mysql')

const Sponsor = sequelize.define('Sponsor', {
  // Model attributes are defined here
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
  timestamps: false
});

module.exports= Sponsor;
