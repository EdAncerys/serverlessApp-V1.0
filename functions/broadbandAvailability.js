const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const sha512 = require('js-sha512'); // component to compute the SHA512

exports.handler = function (event, context, callback) {
  const { postcode, district_id } = JSON.parse(event.body);

  const API_KEY = '76=more=bank=YARD=19';
  // const URL = `https://api.interdns.co.uk/broadband/availability`;
  const URL =
    'https://api.interdns.co.uk/leasedline/quote/' +
    district_id +
    '/' +
    postcode +
    '/BT_Wholesale/Fibre/none/item100mbits/item';
  const HASH = sha512(URL + API_KEY);

  // Send user response
  const headers = {
    User: 'icukapi',
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const body = {
    postcode,
    district_id,
  };

  const config = {
    method: 'post',
    url: URL,
    headers,
    body,
  };

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(body),
    });
  };

  console.log('Body: ', body);

  // Perform API call
  const getFreshDeskTickets = () => {
    axios(config)
      .then((res) => {
        console.log(res);
        sendResponse(res.data);
      })
      .catch((err) => {
        console.log('error');
        sendResponse(err);
      });
  };

  // Make sure method is GET
  if (event.httpMethod == 'POST') {
    getFreshDeskTickets();
  }
};
