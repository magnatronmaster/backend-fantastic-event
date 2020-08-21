const { DataTypes, Model } = require('sequelize');
const MysqlLib = require('../mysql')

const mysqlLib= new MysqlLib();

class Sponsor extends Model {}

Sponsor.init({
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
  // Other model options go here
  mysqlLib, // We need to pass the connection instance
  modelName: 'Sponsor' // We need to choose the model name
});

module.exports= Sponsor;
