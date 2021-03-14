require('dotenv').config(); // Enabling to load Environment variables from a .env File
const jwt = require('jsonwebtoken');

exports.handler = async (event, context, callback) => {
  // const redirectURL = '/views/oneTouch/ne-touch-login.html';
  // console.log('Access denied. You been redirected to: ' + redirectURL);
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const { access_token } = JSON.parse(event.body);
  console.log('Passed access token: ', access_token);

  const authToken = jwt.verify(
    access_token,
    ACCESS_TOKEN_SECRET,
    (err, authData) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log(authData);
        return authData;
      }
    }
  );
  console.log(authToken == true);
  console.log(authToken._id);

  if (authToken._id) {
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: authToken, msg: authToken }),
    };
  } else {
    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ access_token: authToken, msg: authToken }),
    };
  }
};
