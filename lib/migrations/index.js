const sequelize = require('../repository/connection');
const User = require('../models/user');
const Event = require('../models/event');
const User_Event = require('../models/user_event');
const Organization = require('../models/organization');

// const Sponsor = require('../models/sponsors');
// const Speaker = require('../models/speakers');

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});