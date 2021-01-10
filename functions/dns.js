const { doesNotMatch } = require('assert');
const dns = require('dns'); // component to compute the SHA512

exports.handler = function (event, context, callback) {
  const { URL } = JSON.parse(event.body);

  const headers = {
    'Content-Type': 'application/json',
  };

  dns.resolve(URL, (error, value) => {
    if (error) {
      console.log(error);
      callback(error);
      return;
    }

    const res = {
      url: URL,
      IP: value,
    };
    callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify(res),
    });
    console.log(value);
  });
};
