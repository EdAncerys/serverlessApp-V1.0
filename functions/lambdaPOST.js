exports.handler = function (event, context, callback) {
  const parsedBody = event.body;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };

  callback(null, {
    statusCode: 200,
    headers: headers,
    body: parsedBody,
  });

  console.log('Lambda Submitted...');
  console.log(parsedBody);
};
