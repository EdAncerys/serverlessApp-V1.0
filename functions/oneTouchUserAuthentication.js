require('dotenv').config(); // Enabling to load Environment variables from a .env File
const jwt = require('jsonwebtoken');

exports.handler = async (event, context, callback) => {
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
  console.log(authToken._id);

  if (authToken._id) {
    const msg = `Welcome to One Touch Portal ${authToken.email}`;

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: msg }),
    };
  } else {
    const msg = `You need to signed in to perform this action.`;

    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: msg }),
    };
  }
};
