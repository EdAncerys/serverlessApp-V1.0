const nodemailer = require('nodemailer');
require('dotenv').config(); // Enabling to load Environment variables from a .env File

exports.handler = function (event, context, callback) {
  const emailBody = JSON.parse(event.body);
  const name = emailBody.name;
  const email = emailBody.email;
  const subject =
    emailBody.subject + ' | Created at: ' + new Date().toLocaleString() + ' |';
  const description = emailBody.description;
  console.log(event.body);
  console.log('Credentials obtained, sending message...');

  const transporter = nodemailer.createTransport({
    host: process.env.IONOS_HOST,
    port: process.env.IONOS_PORT,
    secure: process.env.IONOS_SECURE,
    auth: {
      user: process.env.IONOS_USER, // replace with your email
      pass: process.env.IONOS_PASS, // replace with your password
    },
  });

  const mailOptions = {
    from: `"Fred Foo 👻" <${process.env.IONOS_USER}>`, // replace with your email
    to: process.env.IONOS_MAILING_LIST, // replace with your mailing list
    subject: `${subject}`,
    html: `${description}`,
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
