const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const sha512 = require('js-sha512'); // component to compute the SHA512

exports.handler = function (event, context, callback) {
  const { postcode, district_id } = JSON.parse(event.body);

  const ICUK_URL = process.env.ICUK_URL;
  const ICUK_API_KEY = process.env.ICUK_API_KEY;
  const ICUK_END_POINT = '/broadband/availability';
  const URL = ICUK_URL + ICUK_END_POINT;
  const HASH = sha512(URL + ICUK_API_KEY);

  // Send user response
  const headers = {
    User: 'icukapi',
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };

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
  console.log('config: ', config);

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };
  // Perform API call
  const broadbandAvailability = () => {
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
    broadbandAvailability();
  }
};
