const { Sequelize } = require('sequelize');
const sequelize = require('./lib/repository/connection');
const Sponsor = require('./lib/models/sponsors');
const sponsor = Sponsor(sequelize, Sequelize);


sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});