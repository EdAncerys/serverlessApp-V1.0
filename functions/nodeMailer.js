const nodemailer = require('nodemailer');
require('dotenv').config(); // Enabling to load Environment variables from a .env File

exports.handler = function (event, context, callback) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE, // replace with service provider
    auth: {
      user: process.env.EMAIL_NAME, // replace with your email
      pass: process.env.EMAIL_PASSWORD, // replace with your password
    },
  });

  const body = JSON.parse(event.body);
  console.log(body);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };

  const mailOptions = {
    from: process.env.EMAIL_NAME, // replace with your email
    to: process.env.MAILING_LIST, // replace with your mailing list
    subject: process.env.SUBJECT + new Date().toLocaleString(),
    html: `<p>Customer Contact Name: <span style="color: red">${body.name}</span></p>
      <p>Email: <span style="color: red">${body.email}</span></p>
      <p>Subject: <br />${body.subject}</p>
      <p>Subject: <br />${body.description}</p>`,
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

      console.log('Email sent successfully');
      console.log(body);
    }
  });
};
