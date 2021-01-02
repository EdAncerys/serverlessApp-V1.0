exports.handler = function (event, context, callback) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };
  callback(null, {
    statusCode: 200,
    headers: headers,
    body: 'Lambda Page Data',
  });

  console.log('Lambda Submitted...');
};
