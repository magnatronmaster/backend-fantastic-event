const { format, add } = require('date-fns')
const email = require('./email');
const EventService = require('../../services/event')
const eventService= new EventService();
const { Op } =require('sequelize');


async function emailCompose(){
  const today = format(new Date(), 'yyyy-MM-dd');
  const afterTomorrow = format(add(new Date(), { days: 2 }), 'yyyy-MM-dd')

  //Get all event between today and after tomorrow
  const events = await eventService.getEventsMail({
    date_start_event: {
      [Op.between]: [ today, afterTomorrow ]
    }
  });

  sendEmail(events);

  return 'Completed';
}

const sendEmail = (events) => {
  events.map((event) => {
    const nameEvent = event.name_event;
    const initialDate = format(new Date(event.date_start_event), 'dd/MM/yyyy HH:mm');
    event.Registers.map((user) => {
      email(
        user.name_register,
        user.email_register,
        nameEvent,
        initialDate,
      )
    })
  })
}

module.exports = emailCompose;
