const sequelize = require('../repository/connection');
const User = require('../models/user');
const Organization = require('../models/organization');
const Event = require('../models/event');
const Organizer = require('../models/organizer');
const Template = require('../models/template');
const Speaker = require('../models/speaker');
const Schedule = require('../models/schedule');
const Sponsor = require('../models/sponsor');
const Register = require('../models/register');

sequelize.sync({ alter: true }).then(() => {
  console.log(`Database & tables created!`);
});
