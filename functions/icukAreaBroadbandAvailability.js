const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const sha512 = require('js-sha512'); // component to compute the SHA512

exports.handler = (event, context, callback) => {
  const urlPath = event.path;
  const postCode = urlPath.substr(urlPath.lastIndexOf('/') + 1);

  const ICUK_URL = process.env.ICUK_URL;
  const ICUK_API_KEY = process.env.ICUK_API_KEY;
  const ICUK_END_POINT = '/broadband/availability/';
  const HASH = sha512(ICUK_END_POINT + postCode + ICUK_API_KEY);
  const URL = ICUK_URL + ICUK_END_POINT + postCode;

  // Send user response
  const headers = {
    User: 'icukapi',
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  console.table(headers);

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  };

  // Perform API call
  const district_id = () => {
    axios
      .get(URL, { headers: headers })
      .then((res) => {
        console.log(res.data);
        sendResponse(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        sendResponse(err);
      });
  };

  // Make sure method is GET
  if (event.httpMethod == 'GET') {
    district_id();
  }
};
