exports.handler = (event, context, callback) => {
  const body = {
    data: 'Hello World!',
    responseCode: 200,
  };

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
};
