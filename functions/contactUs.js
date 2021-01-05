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

  const { name, email, subject } = JSON.parse(event.body);

  const mailOptions = {
    from: process.env.EMAIL_NAME, // replace with your email
    to: process.env.MAILING_LIST, // replace with your mailing list
    subject: process.env.SUBJECT + new Date().toLocaleString(),
    html: `<p>Customer Contact Name: <span style="color: red">${name}</span></p>
      <p>Email: <span style="color: red">${email}</span></p>
      <p>Message: <br />${subject}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error);
      console.log('Error occurs');
    } else {
      callback(null, {
        statusCode: 200,
        body: event.body,
      });
      console.log('Email sent!!!');
      console.log(event.body);
    }
  });
};
