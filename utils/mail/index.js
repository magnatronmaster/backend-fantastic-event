// const { format } = require('date-fns')
const email = require('./email');
// const EventService = require('../../services/event')
// const eventService= new EventService();

function sendEmail(){
  const info = email(
      'event.aplication@gmail.com',
      'luis.lazcanocruz@gmail.com',
      'Luis',
      '25/12/2020'
  );

  console.log('Message sent: %s', info.messageId);
  // const events = eventService.getEvents({}, {where: date_start_event: });
  // events.map((event) => {
  //   event.date_start_event = format(new Date(event.date_start_event))
  //   return event;
  //  Here going mail event to send by person each mail
  // })
}

module.exports = sendEmail;