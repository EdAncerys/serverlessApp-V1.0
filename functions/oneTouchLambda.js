const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); // Enabling to load Environment variables from a .env File

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sha512 = require('js-sha512'); // component to compute the SHA512
const HttpsProxyAgent = require('https-proxy-agent'); // Proxy server
const fetch = require('node-fetch');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'oneTouchDB';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const COLLECTION_ONE_TOUCH_ORDERS = 'oneTouchOrders';

// lambda middleware
let cachedAuthentication = null;
const userAuthentication = async (body) => {
  if (cachedAuthentication) return cachedAuthentication;

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
        Location: '/index.html',
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
  const filterOrders = {
    access_token: data.access_token,
  };

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
      .collection(COLLECTION_ONE_TOUCH_ORDERS)
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
const addOrder = async (db, data) => {
  console.log(data);
  const createOrder = {
    access_token: data.access_token,
    broadband_name: data.oneTouchData.name,
  };

  const authToken = await jwt.verify(
    createOrder.access_token,
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
  delete data['access_token']; // Removing access_token from data object
  data['oneTouchSuperUser'] = authToken.email;

  if (createOrder.broadband_name) {
    await db.collection(COLLECTION).insertMany([data]);
    const msg =
      `Order successfully been created for: ` + createOrder.broadband_name;
    console.log(msg);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: data, msg: msg }),
    };
  } else {
    const msg = `Error creating order for: ` + createOrder.broadband_name;
    console.log(msg);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: data, msg: msg }),
    };
  }
};
const deleteOrder = async (db, data) => {
  const deleteOrder = {
    _id: data._id,
  };
  const orderID = new ObjectId(deleteOrder._id);
  const order = await db
    .collection(COLLECTION_ONE_TOUCH_ORDERS)
    .find({ _id: orderID })
    .toArray();
  const orderValid = order.length > 0;

  if (orderValid && deleteOrder._id) {
    const msg =
      `Oder been successfully deleted from DB. Order ID: ` + deleteOrder._id;
    await db
      .collection(COLLECTION_ONE_TOUCH_ORDERS)
      .deleteOne({ _id: orderID });
    console.log(msg);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: data, msg: msg }),
    };
  } else {
    const msg =
      `Order not found! Error deleting order from DB. Order ID: ` +
      deleteOrder._id;
    console.log(msg);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data, msg: msg }),
    };
  }
};
// icUK Orders
const addressesForPostcodeProvided = async (body) => {
  console.log('QuatAGuard Proxy Server Agent');

  const postcode = body.postcode;
  console.log(postcode);
  // Proxy Server Agent configuration
  const QUOTAGUARD_STATIC_URL = process.env.QUOTAGUARD_STATIC_URL;
  const proxyAgent = new HttpsProxyAgent(QUOTAGUARD_STATIC_URL);
  // icUK configuration
  const ICUK_USER = process.env.ICUK_USER;
  const ICUK_URL = process.env.ICUK_URL;
  const ICUK_API_KEY = process.env.ICUK_API_KEY;
  const ICUK_END_POINT = '/broadband/address_search/';
  const HASH = sha512(ICUK_END_POINT + postcode + ICUK_API_KEY);
  const URL = ICUK_URL + ICUK_END_POINT + postcode;
  console.log(URL);

  const headers = {
    User: ICUK_USER,
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const config = {
    headers,
    agent: proxyAgent,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
  };

  try {
    const response = await fetch(URL, config);
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data.addresses);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ addresses: data.addresses }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(err),
    };
  }
};
const broadbandAvailability = async (body) => {
  console.log('QuatAGuard Proxy Server Agent');

  let postcode = body.postcode.replace(/\s/g, '');
  // Proxy Server Agent configuration
  const QUOTAGUARD_STATIC_URL = process.env.QUOTAGUARD_STATIC_URL;
  const proxyAgent = new HttpsProxyAgent(QUOTAGUARD_STATIC_URL);
  // icUK configuration
  const ICUK_USER = process.env.ICUK_USER;
  const ICUK_URL = process.env.ICUK_URL;
  const ICUK_API_KEY = process.env.ICUK_API_KEY;
  const ICUK_END_POINT = '/broadband/availability/';
  const HASH = sha512(ICUK_END_POINT + postcode + ICUK_API_KEY);
  const URL = ICUK_URL + ICUK_END_POINT + postcode;
  console.log(URL);

  const headers = {
    User: ICUK_USER,
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const config = {
    headers,
    body: JSON.stringify(body),
    method: 'POST',
    agent: proxyAgent,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ products: data.products }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(err),
    };
  }
};

// Error page handling response
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
  if (event.httpMethod) console.log(path);
  if (event) console.log(JSON.parse(event.body));

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
    // Login endPoint
    case '/oneTouch/oneTouchLogin':
      return oneTouchLogin(db, body);
    // Authentication endPoints
    case '/oneTouch/oneTouchUserAuthentication':
      return userAuthentication(body);
    // Placing orders endPoints
    case '/oneTouch/orders/allPlacedOrders':
      return allPlacedOrders(db, body);
    case '/oneTouch/orders/addOrder':
      return addOrder(db, body);
    case '/oneTouch/orders/deleteOrder':
      return deleteOrder(db, body);
    // icUK endPoints
    case '/oneTouch/icUK/addressesForPostcodeProvided':
      return addressesForPostcodeProvided(body);
    case '/oneTouch/icUK/broadbandAvailability':
      return broadbandAvailability(body);

    default:
      return { statusCode: 400 };
  }
};
