const nodemailer = require('nodemailer');
const { pugEngine } = require('nodemailer-pug-engine');
const { resolve } = require('path');
const { config } = require('../../config');

const email = async () => {

  let transporter = nodemailer.createTransport({
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
    from: 'event.aplication@gmail.com', // sender address
    to: 'luis.lazcanocruz@gmail.com', // list of receivers
    subject: 'Fantastic event', // Subject line
    text: 'Hello world!!', // plain text body
    template: 'test',
    ctx: {
      name: 'Luis',
      event: '10/12/2020'
    },
    auth: {
      user: 'event.aplication@gmail.com',
      refreshToken: config.googleRefreshToken,
      accessToken: config.googleAccessToken,
      expires: 1484314697598
    },
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

email().catch(console.error);

module.exports = email;
