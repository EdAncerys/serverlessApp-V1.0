const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File

exports.handler = function (event, context, callback) {
  let PATH = '/api/v2/tickets';
  const URL = `https://${process.env.FD_ENDPOINT}.freshdesk.com/${PATH}`;
  const ENCODING_METHOD = 'base64';
  const AUTHORIZATION_KEY =
    'Basic ' +
    new Buffer.from(process.env.API_KEY + ':' + 'X').toString(ENCODING_METHOD);

  // Send user response
  const headers = {
    Authorization: AUTHORIZATION_KEY,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(body),
    });
  };

  // Perform API call
  const getFreshDeskTickets = () => {
    axios
      .get(URL, { headers: headers })
      .then((res) => {
        console.log(res.headers.date);
        console.log(res.headers.status);
        // console.log(res.data);
        sendResponse(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        sendResponse(err);
      });
  };

  // Make sure method is GET
  if (event.httpMethod == 'GET') {
    getFreshDeskTickets();
  }
};
