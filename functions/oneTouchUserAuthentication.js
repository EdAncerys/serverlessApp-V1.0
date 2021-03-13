require('dotenv').config(); // Enabling to load Environment variables from a .env File
const jwt = require('jsonwebtoken');

exports.handler = async (event, context, callback) => {
  // const redirectURL = '/views/oneTouch/ne-touch-login.html';
  // console.log('Access denied. You been redirected to: ' + redirectURL);
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const { token } = JSON.parse(event.body);
  console.log(token);

  const authData = jwt.verify(token, ACCESS_TOKEN_SECRET, (err, authData) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log(authData);
      return authData;
    }
  });

  // const authData = jwt.verify(token, ACCESS_TOKEN_SECRET);

  console.log(authData.iat);
  if (authData.iat) {
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: authData, msg: token }),
    };
  } else {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: authData, msg: token }),
    };
  }
};
