exports.handler = function (event, context, callback) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };
  console.log('Lambda Submitted...');
  callback(null, {
    statusCode: 200,
    headers: headers,
    body: 'Hello World',
  });
};
