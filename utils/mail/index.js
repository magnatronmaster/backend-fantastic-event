const { format } = require('date-fns')
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
  // const today = format(endOfDay(new Date()).toISOString());
  // const today= format(new Date(2020, 30, 08), 'yyyy-MM-dd') + 'T23:59:59.999Z';
  // console.log('Here init');
  // console.log(today)
  // console.log('Here end');
  const events = eventService.getEventsMail({
    date_start_event: {
      [Op.between]: ['2020-08-30', '2020-09-1']
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
