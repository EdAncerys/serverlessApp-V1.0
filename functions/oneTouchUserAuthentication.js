exports.handler = async (event, context, callback) => {
  // const redirectURL = './oneTouch/one-touch-login.html';
  const redirectURL = '/views/oneTouch/ne-touch-login.html';
  console.log('Access denied. You been redirected to: ' + redirectURL);

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: 'response data' }),
  };
};
