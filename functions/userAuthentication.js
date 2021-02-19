exports.handler = async (event, context, callback) => {
  const redirectURL = '/views/oneTouch/login.html';
  console.log('Access denied. You been redirected to: ' + redirectURL);

  const response = {
    statusCode: 301,
    headers: {
      Location: redirectURL,
    },
  };

  return response;
};
