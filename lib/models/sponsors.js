module.exports = (sequelize, type) => {
  return sequelize.define('Sponsor', {
  // Model attributes are defined here
  id_sponsor: {
    type: type.STRING,
    primaryKey: true,
    allowNull: false
  },
  name_sponsor: {
    type: type.STRING,
    allowNull: false
  },
  url_sponsor: {
    type: type.STRING,
    allowNull: false
  },
  logo_sponsor: {
    type: type.STRING,
    allowNull: false
  }
  }, {});
};
