const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const sha512 = require('js-sha512'); // component to compute the SHA512
const HttpsProxyAgent = require('https-proxy-agent'); // Proxy server
const request = require('request');

const quataguardProxyServer = async (event) => {
  console.log('quataguardProxyServer');
  const body = JSON.parse(event.body);
  console.log(body);

  const QUOTAGUARDSTATIC_URL = process.env.QUOTAGUARDSTATIC_URL;
  const agent = new HttpsProxyAgent(QUOTAGUARDSTATIC_URL);

  let response;
  const method = 'GET';
  const uri =
    'https://obixmhl8nfs7cj:z35ktq5trmoqb9n2mdss3wifw2@eu-central-shield-01.quotaguard.com:9294';

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  request(
    {
      agent: agent,
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10,
      uri,
      method,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: 'name=john',
    },

    function (error, response, body) {
      console.log('Error' + error);
      console.log('Response: ' + response);
      console.log('Body: ' + body);

      if (error) response = sendResponse(error);
      if (response) response = sendResponse(error);
      if (body) response = sendResponse(error);
    }
  );

  return response;
};

const oneTouchAddressesForPostcodeProvided = async (event) => {
  console.table('Getting Addresses For Postcode Provided');

  const urlPath = event.path;
  const postCode = urlPath.substr(urlPath.lastIndexOf('/') + 1);

  const ICUK_URL = process.env.ICUK_URL;
  const ICUK_API_KEY = process.env.ICUK_API_KEY;
  const ICUK_END_POINT = '/broadband/address_search/';
  const HASH = sha512(ICUK_END_POINT + postCode + ICUK_API_KEY);
  const URL = ICUK_URL + ICUK_END_POINT + postCode;
  console.log(URL);

  const headers = {
    User: 'icukapi',
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const response = await axios
    .get(URL, { headers: headers })
    .then((res) => {
      const body = res.data.addresses;
      console.log(body.length);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      };
    })
    .catch((err) => {
      const body = err.response.data;
      console.log(body);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
    });
  return response;
};

module.exports.handler = async (event, context, callback) => {
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
