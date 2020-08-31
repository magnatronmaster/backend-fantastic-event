const { format, add } = require('date-fns')
const email = require('./email');

async function emailCompose(name_register, email_register, nameEvent, date_start_event){
  const initialDate = format(new Date(date_start_event), 'dd/MM/yyyy HH:mm');
    email(
      name_register,
      email_register,
      nameEvent,
      initialDate,
      'register',
    );
};

module.exports = emailCompose;
