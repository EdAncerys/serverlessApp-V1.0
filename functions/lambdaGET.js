exports.handler = function (event, context, callback) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };

  const body = { body: 'Hello World' };

  callback(null, {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(body),
  });

  console.log('Lambda Submitted... ' + body);
};
