exports.handler = function (event, context, callback) {
  // const { name } = JSON.parse(event.body);
  // const value = name || 'World';

  // callback(null, {
  //   statusCode: 200,
  //   body: `Hello ${value}`,
  // });

  callback(null, {
    statusCode: 200,
    body: `Hello World`,
  });
};
