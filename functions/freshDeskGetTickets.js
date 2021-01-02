const fetch = require('node-fetch'); // Fetch module
require('dotenv').config(); // Enabling to load Environment variables from a .env File

exports.handler = async function (event, context, callback) {
  let PATH = '/api/v2/tickets';
  const URL = `https://${process.env.FD_ENDPOINT}.freshdesk.com/${PATH}`;
  const ENCODING_METHOD = 'base64';
  const AUTHORIZATION_KEY =
    'Basic ' +
    new Buffer.from(process.env.API_KEY + ':' + 'X').toString(ENCODING_METHOD);

  const defaultOptions = {
    method: 'GET',
    mode: 'cors',
    headers: {
      Authorization: AUTHORIZATION_KEY,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  try {
    await fetch(URL, defaultOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log('Loading FreshSDesk Data: ', data);
        // res.json({ msg: data });
      });
  } catch (error) {
    const errorMsg = error.message;
    console.log(errorMsg);
    // res.json({ msg: errorMsg });
  }
};
