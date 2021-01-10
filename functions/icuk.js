const sha512 = require('js-sha512'); // component to compute the SHA512

exports.handler = function (event, context, callback) {
  const body = JSON.parse(event.body);

  let example = '/broadband/user/api@interdsl.net' + '<api_key>';

  const postCode = body.postCode;
  const HASH = sha512(
    '/leasedline/address_results/' + postCode + '16-CHECK-form-CAKE-25'
  );
  const URL =
    `https://api.interdns.co.uk/leasedline/address_results/` + postCode;
  const headers = {
    User: 'ndgsuper',
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
