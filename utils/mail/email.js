const nodemailer = require('nodemailer');
const { pugEngine } = require('nodemailer-pug-engine');
const { resolve } = require('path');
const { config } = require('../../config');

const email = async (
  from= 'event.aplication@gmail.com',
  to,
  name,
  date
  ) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          type: 'OAuth2',
          clientId: config.googleClientId,
          clientSecret: config.googleClientSecret,
      },
    });

    transporter.use('compile', pugEngine({
      templateDir: resolve(__dirname + '/templates'),
      pretty: true,
    }));

    const mailOptions = {
      from, // sender address
      to, // list of receivers
      subject: 'Fantastic event', // Subject line
      template: 'test',
      ctx: {
        name,
        event: date,
      },
      auth: {
        user: 'from',
        refreshToken: config.googleRefreshToken,
        accessToken: config.googleAccessToken,
        expires: 1484314697598
      },
    }

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

email().catch(console.error);

module.exports = email;
