const { format, add } = require('date-fns')
const email = require('./email');
const EventService = require('../../services/event')
const eventService= new EventService();
const { Op } =require('sequelize');


async function sendEmail(){

  const today = format(new Date(), 'yyyy-MM-dd');
  const afterTomorrow = format(add(new Date(), { days: 2 }), 'yyyy-MM-dd')

  const events = await eventService.getEventsMail({
    date_start_event: {
      [Op.between]: [ today, afterTomorrow ]
    }
  });

  events.map((event) => {
    const nameEvent = event.name_event;
    const decriptionEvent = event.description_event;
    const initialDate = format(new Date(event.date_start_event), 'dd/MM/yyyy HH:mm');
    event.Registers.map((user) => {
      email(
        user.name_register,
        user.email_register,
        initialDate,
      )
    })
  })

  return 'Completed';
}

//   const info = email(
//       'event.aplication@gmail.com',
//       'luis.lazcanocruz@gmail.com',
//       'Luis',
//       '25/12/2020'
//   );

//   console.log('Message sent: %s', info.messageId);

module.exports = sendEmail;
