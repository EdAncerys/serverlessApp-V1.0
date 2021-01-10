exports.handler = function (event, context, callback) {
  const body = {
    data: 'icuk Test',
    responseCode: 200,
  };

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
};
