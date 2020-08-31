const { format, add } = require('date-fns')
const email = require('./email');
const EventService = require('../../services/event')
const eventService= new EventService();
const { Op } =require('sequelize');


function sendEmail(){
//   const info = email(
//       'event.aplication@gmail.com',
//       'luis.lazcanocruz@gmail.com',
//       'Luis',
//       '25/12/2020'
//   );

//   console.log('Message sent: %s', info.messageId);
  const today = format(new Date(), 'yyyy-MM-dd');
  const afterTomorrow = format(add(new Date(), { days: 2 }), 'yyyy-MM-dd')

  const events = eventService.getEventsMail({
    date_start_event: {
      [Op.between]: [ today, afterTomorrow ]
    }
  });
  // events.map((event) => {
  //   event.date_start_event = format(new Date(event.date_start_event))
  //   return event;
  //  Here going mail event to send by person each mail
  // })
  return events;
}

module.exports = sendEmail;
