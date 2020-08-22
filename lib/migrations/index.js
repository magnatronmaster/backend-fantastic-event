const sequelize = require('../repository/connection')
const Sponsor = require('../models/sponsors');

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});