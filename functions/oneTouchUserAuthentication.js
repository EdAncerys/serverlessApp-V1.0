exports.handler = async (event, context, callback) => {
  // const redirectURL = '/views/oneTouch/ne-touch-login.html';
  // console.log('Access denied. You been redirected to: ' + redirectURL);
  const data = event.headers;
  const bearerHeader = event.headers.token;

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: data, msg: bearerHeader }),
  };
};
