const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File


exports.handler = function (event, context, callback) {
  // const body = JSON.parse(event.body);

  callback(null, {
    statusCode: 200,
    body: 'JSON.stringify(body)',
  });
};
