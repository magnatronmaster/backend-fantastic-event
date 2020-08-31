const nodemailer = require('nodemailer');
const { pugEngine } = require('nodemailer-pug-engine');
const { resolve } = require('path');
const { config } = require('../../config');

const email = async( name, to, event, date, template ) => {
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
    from: config.email, // sender address
    to, // list of receivers
    subject: `Fantastic event: ${event}`, // Subject line
    template: template,
    ctx: {
      name,
      event,
      date,
    },
    auth: {
      user: config.email,
      refreshToken: config.googleRefreshToken,
      accessToken: config.googleAccessToken,
      expires: 1484314697598
    },
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    return error;
  }
};

module.exports = email;
