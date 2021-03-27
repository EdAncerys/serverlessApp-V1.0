const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const sha512 = require('js-sha512'); // component to compute the SHA512

const oneTouchAddressesForPostcodeProvided = async (event) => {
  console.table('Getting Addresses For Postcode Provided');

  const urlPath = event.path;
  const postCode = urlPath.substr(urlPath.lastIndexOf('/') + 1);

  const ICUK_URL = process.env.ICUK_URL;
  const ICUK_API_KEY = process.env.ICUK_API_KEY;
  const ICUK_END_POINT = '/broadband/address_search/';
  const HASH = sha512(ICUK_END_POINT + postCode + ICUK_API_KEY);
  const URL = ICUK_URL + ICUK_END_POINT + postCode;

  // Send user response
  const headers = {
    User: 'icukapi',
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  axios
    .post(URL, { headers: headers })
    .then((res) => {
      console.log(res.data);
      sendResponse(res.data);
    })
    .catch((err) => {
      console.log(err.response);
      console.log(err.response.data);
      sendResponse(err);
    });

  return sendResponse;
};

exports.handler = (event, context, callback) => {
  const {
    sub_premises,
    premises_name,
    thoroughfare_number,
    thoroughfare_name,
    locality,
    post_town,
    county,
    postcode,
    district_id,
    nad_key,
  } = JSON.parse(event.body);

  // Send user response
  const headers = {
    User: 'icukapi',
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };

  const body = {
    sub_premises,
    premises_name,
    thoroughfare_number,
    thoroughfare_name,
    locality,
    post_town,
    county,
    postcode,
    district_id,
    nad_key,
  };

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  // Perform API call
  const broadbandAvailability = () => {
    axios
      .post(URL, body, { headers: headers })
      .then((res) => {
        console.log(res.data);
        sendResponse(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.response.data);
        sendResponse(err);
      });
  };

  // Make sure method is GET
  if (event.httpMethod == 'POST') {
    broadbandAvailability();
  }
};

module.exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case 'GET':
      return oneTouchAddressesForPostcodeProvided(event);
    case 'POST':
      const body = JSON.parse(event.body);

      return console.log(event.httpMethod);
    case 'DELETE':
      return console.log(event.httpMethod);
    case 'PATCH':
      return console.log(event.httpMethod);
    default:
      return { statusCode: 400 };
  }
};
