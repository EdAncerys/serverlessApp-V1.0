const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); // Enabling to load Environment variables from a .env File

const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sha512 = require('js-sha512'); // component to compute the SHA512
const HttpsProxyAgent = require('https-proxy-agent'); // Proxy server
const fetch = require('node-fetch');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'oneTouchDB';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const COLLECTION_ONE_TOUCH_ORDERS = 'oneTouchOrders';
const COLLECTION_ONE_TOUCH_SUPER_USER = 'oneTouchSupperUsers';
const COLLECTION_ONE_TOUCH_CUSTOMER = 'oneTouchCustomer';

// lambda middleware
const userAuthentication = async (body) => {
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
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } else {
    return {
      statusCode: 301,
      headers: {
        Location: '/index.html',
      },
    };
  }
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
// oneTouch Portal login & signup
const oneTouchLogin = async (db, data) => {
  const loginUser = {
    email: data.email,
    password: data.password,
  };
  console.log(loginUser);
  const user = await db
    .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
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
const oneTouchSignUp = async (db, data) => {
  const signUpUser = {
    email: data.email,
    password: data.password,
  };
  console.table(signUpUser);
  const user = await db
    .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
    .find({ email: signUpUser.email })
    .toArray();
  console.log(user);

  const userValid = user.length > 0;

  if (!userValid && signUpUser.email) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signUpUser.password, saltRounds);

    data.password = hashedPassword;
    await db.collection(COLLECTION_ONE_TOUCH_SUPER_USER).insertMany([data]);
    const msg =
      `Account created successfully! Welcome to One Touch Portal ` +
      signUpUser.email;

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data, msg: msg }),
    };
  } else {
    const msg =
      `Failed to create account! User already exists with email: ` +
      signUpUser.email;
    console.log(msg);

    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ statusCode: 404, user: data, msg: msg }),
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
    await db.collection(COLLECTION_ONE_TOUCH_ORDERS).insertMany([data]);
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
// oneTouch Customers
const addCustomer = async (db, data) => {
  const addCustomer = {
    access_token: data.access_token,
    customerEmail: data.customerEmail,
  };
  console.log(addCustomer);
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const authToken = await jwt.verify(
    addCustomer.access_token,
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

  const user = await db
    .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
    .find({
      oneTouchSuperUser: authToken.email,
      customerEmail: addCustomer.customerEmail,
    })
    .toArray();
  console.log(user);
  const userExist = user.length > 0;

  if (!userExist && addCustomer.customerEmail) {
    delete data['access_token']; // Remove access_token from data
    data['oneTouchSuperUser'] = authToken.email; // Add oneTouchSuperUser data

    await db.collection(COLLECTION_ONE_TOUCH_CUSTOMER).insertMany([data]);
    const msg =
      `User successfully added to DB with email: ` + addCustomer.customerEmail;
    console.log(msg);
    console.log(data);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data, msg: msg }),
    };
  } else {
    const msg = `User Already Exists With email: ` + addCustomer.customerEmail;
    console.log(msg);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  }
};
const deleteCustomer = async (db, data) => {
  const deleteCustomer = {
    _id: data.id,
  };
  const userID = new ObjectId(deleteCustomer._id);
  const user = await db
    .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
    .find({ _id: userID })
    .toArray();
  const userExist = user.length > 0;

  if (userExist && deleteCustomer._id) {
    const msg =
      `User been successfully deleted from DB with ID: ` + deleteCustomer._id;
    await db
      .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
      .deleteOne({ _id: userID });
    console.log(msg);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data, msg: msg }),
    };
  } else {
    const msg =
      `User not found! Error deleting user from DB with ID: ` +
      deleteCustomer._id;
    console.log(msg);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  }
};
const filterCustomers = async (db, data) => {
  const filterCustomers = {
    access_token: data.access_token,
  };
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const authToken = await jwt.verify(
    filterCustomers.access_token,
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
  console.log(authToken);

  const dbData = await db
    .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
    .find({ oneTouchSuperUser: authToken.email })
    .toArray();
  console.table(dbData);

  try {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dbData),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(err),
    };
  }
};
const findCustomersById = async (db, data) => {
  const findCustomer = {
    id: data.findOneById,
  };

  const customerID = new ObjectId(findCustomer.id);
  const customerData = await db
    .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
    .find({ _id: customerID })
    .toArray();

  console.log(customerData);
  const customerValid = customerData.length > 0;
  console.table(customerValid);

  if (customerValid) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData[0]),
    };
  } else {
    const msg = `Error finding customer. Customer ID: ` + findCustomer.id;
    console.log(msg);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  }
};
const oneTouchUpdateUser = async (db, data) => {
  const updateUser = {
    email: data.email,
  };
  const user = await db
    .collection(COLLECTION)
    .find({ email: updateUser.email })
    .toArray();
  const userExist = user[0];

  if (userExist && updateUser.email) {
    const msg =
      `User been successfully updated in DB with email: ` + updateUser.email;
    const oneTouchUser = { email: updateUser.email };
    const updatedValues = { $set: data };

    await db.collection(COLLECTION).updateOne(oneTouchUser, updatedValues);
    console.log(msg);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedUser: data, msg: msg, user: user }),
    };
  } else {
    const msg =
      `User not found! Error updating user in DB where email: ` +
      updateUser.email;
    console.log(msg);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updatedUser: data, msg: msg, user: user }),
    };
  }
};

// icUK data
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
// iONOS email account
const iONOS = async (body, callback) => {
  console.log('Credentials obtained, sending email via iONOS...');

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

  const email = authToken.email;
  const subject = body.subject;
  const description = body.description;

  const transporter = nodemailer.createTransport({
    host: process.env.IONOS_HOST,
    port: process.env.IONOS_PORT,
    secure: process.env.IONOS_SECURE,
    auth: {
      user: process.env.IONOS_USER, // replace with your email
      pass: process.env.IONOS_PASS, // replace with your password
    },
  });

  const mailOptions = {
    from: `"oneTouch Portal 👻" <${process.env.IONOS_USER}>`, // replace with your email
    to: email, // cc mailing list
    bcc: process.env.IONOS_MAILING_LIST, // bcc mailing list
    subject: `${subject}`,
    html: `${description}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      callback(error);
      console.log('Error occurred. ' + error.message);
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body),
      });

      console.log(body);
      console.log(info);
      console.log('Message sent: %s', info.messageId);
    }
  });
};

// Error page handling response endpoints
const oneTouchPortalHTML = [
  '/',
  '/views/oneTouch/add-customer',
  '/views/oneTouch/dev',
  '/views/oneTouch/index',
  '/views/oneTouch/live-connections',
  '/views/oneTouch/manage-customer',
  '/views/oneTouch/one-touch-signup',
  '/views/oneTouch/connection-checker',
  '/views/oneTouch/raise-ticket',
  '/views/oneTouch/support-docs',
  '/views/oneTouch/version-two',
];

module.exports.handler = async (event, context, callback) => {
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
    // Login & logout endPoint
    case '/oneTouch/oneTouchLogin':
      return oneTouchLogin(db, body);
    case '/oneTouch/oneTouchSignUp':
      return oneTouchSignUp(db, body);
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
    // oneTouch customer endPoints
    case '/oneTouch/customer/addCustomer':
      return addCustomer(db, body);
    case '/oneTouch/customer/deleteCustomer':
      return deleteCustomer(db, body);
    case '/oneTouch/customer/filterCustomers':
      return filterCustomers(db, body);
    case '/oneTouch/customer/findCustomersById':
      return findCustomersById(db, body);
    // icUK endPoints
    case '/oneTouch/icUK/addressesForPostcodeProvided':
      return addressesForPostcodeProvided(body);
    case '/oneTouch/icUK/broadbandAvailability':
      return broadbandAvailability(body);
    // iONOS endPoints
    case '/oneTouch/iONOS':
      return iONOS(body, callback);

    default:
      return { statusCode: 400 };
  }
};
