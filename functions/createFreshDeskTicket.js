const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File

exports.handler = (event, context, callback) => {
  const { name, email, subject, description } = JSON.parse(event.body);

  const body = {
    name,
    email,
    subject,
    description,
    status: 2,
    priority: 1,
  };

  let PATH = 'api/v2/tickets';
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

  const config = {
    method: 'post',
    url: URL,
    headers: {
      Authorization: AUTHORIZATION_KEY,
      'Content-Type': 'application/json',
      Cookie: '_x_w=39_1; _x_m=x_c',
    },
    data: body,
  };

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(body),
    });
  };

  console.log('Body', body);

  // Perform API call
  const getFreshDeskTickets = () => {
    axios(config)
      .then((res) => {
        console.log(res.headers.date);
        console.log(res.headers.status);
        // console.log(res.data);
        sendResponse(res.data);
      })
      .catch((err) => {
        console.log('error');
        console.log(err.response.data);
        sendResponse(err.response.data);
      });
  };

  // Make sure method is GET
  if (event.httpMethod == 'POST') {
    getFreshDeskTickets();
  }
};
