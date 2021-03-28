require('dotenv').config(); // Enabling to load Environment variables from a .env File
const sha512 = require('js-sha512'); // component to compute the SHA512
const HttpsProxyAgent = require('https-proxy-agent'); // Proxy server
const fetch = require('node-fetch');

const icUKAddressesForPostcodeProvided = async (event) => {
  console.log('QuatAGuard Proxy Server Agent');

  const urlPath = event.path;
  const postCode = urlPath.substr(urlPath.lastIndexOf('/') + 1);
  // Proxy Server Agent configuration
  const QUOTAGUARD_STATIC_URL = process.env.QUOTAGUARD_STATIC_URL;
  const proxyAgent = new HttpsProxyAgent(QUOTAGUARD_STATIC_URL);
  // icUK configuration
  const ICUK_USER = process.env.ICUK_USER;
  const ICUK_URL = process.env.ICUK_URL;
  const ICUK_API_KEY = process.env.ICUK_API_KEY;
  const ICUK_END_POINT = '/broadband/address_search/';
  const HASH = sha512(ICUK_END_POINT + postCode + ICUK_API_KEY);
  const URL = ICUK_URL + ICUK_END_POINT + postCode;
  console.log(URL);

  const headers = {
    User: ICUK_USER,
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const config = {
    headers,
    agent: proxyAgent,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
  };

  try {
    const response = await fetch(URL, config);
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data.addresses);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ addresses: data.addresses }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(err),
    };
  }
};

const icUKBroadbandDeals = async (body) => {
  console.log('QuatAGuard Proxy Server Agent');

  // Proxy Server Agent configuration
  const QUOTAGUARD_STATIC_URL = process.env.QUOTAGUARD_STATIC_URL;
  const proxyAgent = new HttpsProxyAgent(QUOTAGUARD_STATIC_URL);
  // icUK configuration
  const ICUK_USER = process.env.ICUK_USER;
  const ICUK_URL = process.env.ICUK_URL;
  const ICUK_API_KEY = process.env.ICUK_API_KEY;
  const ICUK_END_POINT = '/broadband/address_search/';
  const HASH = sha512(ICUK_END_POINT + postCode + ICUK_API_KEY);
  const URL = ICUK_URL + ICUK_END_POINT + postCode;
  console.log(URL);

  const headers = {
    User: ICUK_USER,
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const config = {
    headers,
    agent: proxyAgent,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
  };

  try {
    const response = await fetch(URL, config);
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data.addresses);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ addresses: data.addresses }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(err),
    };
  }
};

module.exports.handler = async (event, context, callback) => {
  let body;
  if (event.body) body = JSON.parse(event.body);

  switch (event.httpMethod) {
    case 'GET':
      return icUKAddressesForPostcodeProvided(event);
    case 'POST':
      return icUKBroadbandDeals(body);
    case 'DELETE':
      return console.log(event.httpMethod);
    case 'PATCH':
      return console.log(event.httpMethod);
    default:
      return { statusCode: 400 };
  }
};
