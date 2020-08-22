const sequelize = require('../repository/connection');
const Sponsor = require('../models/sponsors');
const Speaker = require('../models/speakers');

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});