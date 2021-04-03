const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const jwt = require('jsonwebtoken');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'oneTouchDB';
const COLLECTION = 'oneTouchCustomer';

const userAuthentication = async (token) => {
  console.log(token);

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const authToken = await jwt.verify(
    token,
    ACCESS_TOKEN_SECRET,
    (err, authData) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log(authData);
        return authData;
      }
    }
  );

  if (authToken) {
    return true;
  } else {
    const msg = `Not Authorized.`;

    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  }
};

module.exports.handler = async (event, context) => {
  const path = event.path;
  console.log(path);

  let body;
  if (event.body) body = JSON.parse(event.body);

  switch (path) {
    case 'GET':
      return oneTouchQueryAllUsers(db);
    case '/hello':
      return oneTouchDeleteCustomer(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};

// const function testFunc => (console.log('auth') => (console.log('2nd func')) => {
//   console.log('logic');
// });
