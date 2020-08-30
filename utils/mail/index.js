const { format } = require('date-fns')
const email = require('./email');
const EventService = require('../../services/event')
const eventService= new EventService();
const { Op } =require('sequelize');


function sendEmail(){
  const events = eventService.getEventsMail({
    date_start_event: {
      [Op.between]: ['2020-08-30', '2020-09-1']
    }
  });
  return events;
}

module.exports = sendEmail;
