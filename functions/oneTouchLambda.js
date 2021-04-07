const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); // Enabling to load Environment variables from a .env File

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'oneTouchDB';

// lambda middleware
let cachedAuthentication = null;
const userAuthentication = async (body) => {
  if (cachedAuthentication) return cachedAuthentication;

  if (!body.access_token) {
    return {
      statusCode: 301,
      headers: {
        Location: '/index.html',
      },
    };
  }

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const authToken = await jwt.verify(
    body.access_token,
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
    cachedAuthentication = authToken;
    const msg = `User Authorized.`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  } else {
    const msg = `Not Authorized.`;

    return {
      statusCode: 301,
      headers: {
        Location: '/one-touch-login.html',
      },
      body: JSON.stringify({ msg }),
    };
  }
};

const middleware = async (event) => {
  console.log('Lambda middleware');
  const statusCode = 401;
  const ok = false;
  const msg = `Not Authorized.`;

  const response = {
    statusCode,
    ok,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ msg }),
  };

  return response;
};

let cachedDb = null;
const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const oneTouchLogin = async (db, data) => {
  // const response = await middleware(data);
  // if (!response.ok) {
  //   return {
  //     statusCode: response.statusCode,
  //     body: response.body,
  //   };
  // }

  const COLLECTION = 'oneTouchSupperUsers';

  const loginUser = {
    email: data.email,
    password: data.password,
  };
  console.log(loginUser);
  const user = await db
    .collection(COLLECTION)
    .find({ email: loginUser.email })
    .toArray();
  console.log('DB User:', user);

  const userValid = user.length > 0;
  let passwordValid = false;
  console.log('userValid:', userValid === true);

  if (userValid) {
    passwordValid = await bcrypt.compare(loginUser.password, user[0].password);
    console.log('passwordValid:', passwordValid);
  }
  if (userValid && passwordValid) {
    const msg =
      `You successfully logged in! Welcome to One Touch Portal ` +
      loginUser.email;
    console.log(msg);

    // JWT configuration
    delete user[0]['password'];
    const userData = user[0];
    const expTime = '1h';
    console.log('User data passed on to JWT: ', userData);

    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const access_token = jwt.sign(userData, ACCESS_TOKEN_SECRET, {
      expiresIn: expTime,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ access_token, msg }),
    };
  } else {
    const msg =
      `Access denied! Username or password do not mach for: ` + loginUser.email;
    console.log(msg);

    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  }
};

// oneTouch Orders
const allPlacedOrders = async (db, data) => {
  const COLLECTION = 'oneTouchOrders';

  const filterOrders = {
    access_token: data.access_token,
  };

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const authToken = await jwt.verify(
    filterOrders.access_token,
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

  if (filterOrders.access_token) {
    const dbData = await db
      .collection(COLLECTION)
      .find({ oneTouchSuperUser: authToken.email })
      .toArray();
    console.log(dbData);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: dbData }),
    };
  } else {
    const msg = `Error accrued. No orders found for: ` + authToken.email;
    console.log(msg);

    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: msg }),
    };
  }
};

const oneTouchPortalHTML = [
  '/',
  '/views/oneTouch/add-customer',
  '/views/oneTouch/dev',
  '/views/oneTouch/index',
  '/views/oneTouch/live-connections',
  '/views/oneTouch/manage-customer',
  '/views/oneTouch/one-touch-signup',
  '/views/oneTouch/order-new-connection',
  '/views/oneTouch/raise-ticket',
  '/views/oneTouch/support-docs',
  '/views/oneTouch/version-two',
];

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  const path = event.path;
  console.log(path);

  let body = null;
  if (event.body) body = JSON.parse(event.body);

  // Redirects to error html
  if (event.httpMethod === 'GET' && !oneTouchPortalHTML.includes(path)) {
    console.log('Path end point not found');
    console.log(path);
    return {
      statusCode: 301,
      headers: {
        Location: '/views/oneTouch/error.html',
      },
    };
  }

  switch (path) {
    case '/oneTouch/oneTouchLogin':
      return oneTouchLogin(db, body);
    case '/oneTouch/oneTouchUserAuthentication':
      return userAuthentication(body);
    case '/oneTouch/orders/allPlacedOrders':
      return allPlacedOrders(db, body);
    default:
      return { statusCode: 400 };
  }
};
