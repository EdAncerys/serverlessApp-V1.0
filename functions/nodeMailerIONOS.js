const nodemailer = require('nodemailer');
require('dotenv').config(); // Enabling to load Environment variables from a .env File

exports.handler = function (event, context, callback) {
  // const body = JSON.parse(event.body);
  const subject = 'Nodemailer is unicode friendly ✔';
  const emailBody = '<p><b>Hello</b> to myself!</p>';

  console.log('Credentials obtained, sending message...');

  // const transporter = nodemailer.createTransport({
  //   service: process.env.EMAIL_SERVICE, // replace with service provider
  //   auth: {
  //     user: process.env.EMAIL_NAME, // replace with your email
  //     pass: process.env.EMAIL_PASSWORD, // replace with your password
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.co.uk',
    port: 465,
    secure: true,
    auth: {
      user: 'ed.ancerys@ndg-technology.com', // replace with your email
      pass: 'NDGT3chn0l0gy1234!@', // replace with your password
    },
  });

  const mailOptions = {
    from: 'Email from IONOS account', // replace with your email
    to: 'ed.ancerys@ndg-technology.com', // replace with your mailing list
    subject: `${subject}`,
    html: `${emailBody}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error);
      console.log('Error occurred. ' + error.message);
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body),
      });

      console.log(body);
      console.log('Message sent: %s', info.messageId);
    }
  });
};
