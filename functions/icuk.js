const sha512 = require('js-sha512'); // component to compute the SHA512

exports.handler = function (event, context, callback) {
  const body = JSON.parse(event.body);

  const postCode = body.postCode;
  const API_KEY = '76=more=bank=YARD=19';
  const HASH = sha512('/leasedline/address_results/' + postCode + API_KEY);
  const URL =
    `https://api.interdns.co.uk/leasedline/address_results/` + postCode;
  const headers = {
    User: 'icukapi',
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };

  const res = {
    hash: HASH,
    url: URL,
    body: body,
    postCode: body.postCode,
  };
  callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify(res),
  });
};
