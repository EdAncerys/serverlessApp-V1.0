exports.handler = async (event) => {
  const redirectURL = '../dist/error.html';
  console.log('Access denied. You been redirected to: ' + redirectURL);

  const response = {
    statusCode: 301,
    headers: {
      Location: redirectURL,
    },
  };

  return response;
};
