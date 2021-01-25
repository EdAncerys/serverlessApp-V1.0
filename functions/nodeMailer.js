const nodemailer = require('nodemailer');
require('dotenv').config(); // Enabling to load Environment variables from a .env File

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // replace with service provider
    auth: {
      user: process.env.EMAIL_NAME, // replace with your email
      pass: process.env.EMAIL_PASSWORD, // replace with your password
    },
  });

  const mailOptions = {
    from: 'process.env.EMAIL_FROM', // replace with your email
    to: process.env.GMAIL_MAILING_LIST, // replace with your mailing list
    subject: `${body.subject}`,
    html: `${body.description}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error);
      console.log('Error sending email');
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body),
      });

      console.log(body);
      console.log('Email sent successfully');
    }
  });
};
