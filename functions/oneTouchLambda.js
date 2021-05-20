const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); // Enabling to load Environment variables from a .env File

const nodemailer = require('nodemailer');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sha512 = require('js-sha512'); // component to compute the SHA512
const HttpsProxyAgent = require('https-proxy-agent'); // Proxy server
const fetch = require('node-fetch');

const MONGO_DB_ENVIRONMENT = process.env.MONGO_DB_ENVIRONMENT;
const MONGODB_URI_DEV = process.env.MONGODB_URI_DEV;
let MONGODB_URI = process.env.MONGODB_URI;
if (MONGO_DB_ENVIRONMENT === 'development') MONGODB_URI = MONGODB_URI_DEV;
console.table(`DB connection URI: ` + MONGODB_URI);

const DB_NAME = 'oneTouchDB';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const COLLECTION_ONE_TOUCH_BROADBAND = 'oneTouchBroadband';
const COLLECTION_ONE_TOUCH_SUPER_USER = 'oneTouchSuperUser';
const COLLECTION_ONE_TOUCH_CUSTOMER = 'oneTouchCustomer';

// lambda middleware
let cachedAuthToken = null;
const userAuthentication = async (body) => {
  let value = null;
  console.log(value);
  if (cachedAuthToken) console.log(`Cashed Token`);
  if (!cachedAuthToken)
    cachedAuthToken = await jwt.verify(
      body.access_token,
      ACCESS_TOKEN_SECRET,
      (error, authData) => {
        if (error) {
          console.log(error);
          return false;
        } else {
          console.log(authData);
          value = authData;
          return authData;
        }
      }
    );

  if (cachedAuthToken) {
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
    const expTime = '24h';
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
const userPlacedOrders = async (db, data) => {
  const filterOrders = {
    access_token: data.access_token,
  };

  const authToken = await jwt.verify(
    filterOrders.access_token,
    ACCESS_TOKEN_SECRET,
    (error, authData) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log(authData);
        return authData;
      }
    }
  );

  if (authToken) {
    const oneTouchBroadbandData = await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .find({ 'oneTouchSuperUser.id': authToken._id })
      .toArray();
    console.log(oneTouchBroadbandData);

    const userPlacedOrdersPromises = oneTouchBroadbandData.map(
      async (customer) => {
        const customerId = customer.oneTouchCustomer.id;
        const superUserId = customer.oneTouchSuperUser.id;
        const customerObjectId = new ObjectId(customerId);
        const superUserObjectId = new ObjectId(superUserId);

        // fetching customer object from db
        const customerPromise = await db
          .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
          .find({ _id: customerObjectId })
          .toArray();
        customer['oneTouchCustomer'] = customerPromise;

        // fetching superUser object from db
        const superUserPromise = await db
          .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
          .find({ _id: superUserObjectId })
          .toArray();
        customer['oneTouchSuperUser'] = superUserPromise;

        return customer;
      }
    );
    const data = await Promise.all(userPlacedOrdersPromises);
    console.log(data);
    // removing superUser password from returned data hash & refactor data
    const oneTouchBroadband = await data.map((broadband) => {
      delete broadband['oneTouchSuperUser'][0]['password'];
      broadband['oneTouchCustomer'] = broadband['oneTouchCustomer'][0];
      broadband['oneTouchSuperUser'] = broadband['oneTouchSuperUser'][0];
      return broadband;
    });
    console.log(oneTouchBroadband);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oneTouchBroadband }),
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
const oneTouchBroadband = async (db, body) => {
  const oneTouchBroadbandData = await db
    .collection(COLLECTION_ONE_TOUCH_BROADBAND)
    .find({})
    .toArray();
  console.log(oneTouchBroadbandData);

  if (oneTouchBroadbandData) {
    const userPlacedOrdersPromises = oneTouchBroadbandData.map(
      async (customer) => {
        const customerId = customer.oneTouchCustomer.id;
        const superUserId = customer.oneTouchSuperUser.id;
        const customerObjectId = new ObjectId(customerId);
        const superUserObjectId = new ObjectId(superUserId);

        // fetching customer object from db
        const customerPromise = await db
          .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
          .find({ _id: customerObjectId })
          .toArray();
        customer['oneTouchCustomer'] = customerPromise;

        // fetching superUser object from db
        const superUserPromise = await db
          .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
          .find({ _id: superUserObjectId })
          .toArray();
        customer['oneTouchSuperUser'] = superUserPromise;

        return customer;
      }
    );
    const data = await Promise.all(userPlacedOrdersPromises);
    console.log(data);
    // removing superUser password from returned data hash & refactor data
    const oneTouchBroadband = await data.map((broadband) => {
      delete broadband['oneTouchSuperUser'][0]['password'];
      broadband['oneTouchCustomer'] = broadband['oneTouchCustomer'][0];
      broadband['oneTouchSuperUser'] = broadband['oneTouchSuperUser'][0];
      return broadband;
    });
    console.log(oneTouchBroadband);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oneTouchBroadband }),
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
    oneTouchCustomer: data.oneTouchCustomerData,
    oneTouchBroadband: data.oneTouchBroadband,
  };

  const authToken = await jwt.verify(
    createOrder.access_token,
    ACCESS_TOKEN_SECRET,
    (error, authData) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log(authData);
        return authData;
      }
    }
  );

  const oneTouchBroadband = {
    oneTouchSuperUser: { id: authToken._id },
    oneTouchCustomer: { id: createOrder.oneTouchCustomer._id },
    oneTouchBroadband: createOrder.oneTouchBroadband,
  };

  if (
    authToken &&
    createOrder.oneTouchCustomer &&
    createOrder.oneTouchBroadband
  ) {
    await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .insertMany([oneTouchBroadband]);
    const msg =
      `Order successfully been created for: ` +
      createOrder.oneTouchBroadband.broadband_name;
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
      `Error creating order for: ` +
      createOrder.oneTouchBroadband.broadband_name;
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
    .collection(COLLECTION_ONE_TOUCH_BROADBAND)
    .find({ _id: orderID })
    .toArray();
  const orderValid = order.length > 0;

  if (orderValid && deleteOrder._id) {
    const msg =
      `Oder been successfully deleted from DB. Order ID: ` + deleteOrder._id;
    await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
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
// oneTouch freshDesk
const allFreshDeskTickets = async (db, data) => {
  let PATH = 'api/v2/tickets';
  const FD_API_KEY = process.env.FD_API_KEY;
  const FD_ENDPOINT = process.env.FD_ENDPOINT;
  const URL = `https://${FD_ENDPOINT}.freshdesk.com/${PATH}`;
  const ENCODING_METHOD = 'base64';
  const AUTHORIZATION_KEY =
    'Basic ' +
    new Buffer.from(FD_API_KEY + ':' + 'X').toString(ENCODING_METHOD);

  console.log(FD_API_KEY, FD_ENDPOINT);
  const headers = {
    Authorization: AUTHORIZATION_KEY,
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const config = {
    headers,
  };

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data);

    const msg = `Successfully Fetched All Fresh Desk Tickets`;
    console.log(msg);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, msg }),
    };
  } catch (error) {
    const msg = `Failed to Fetch Fresh Desk Tickets`;
    console.log(msg);
    console.log(error);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg, error }),
    };
  }
};
const freshDeskOneTouchUserTickets = async (db, data) => {
  let PATH = 'api/v2/tickets';
  const FD_API_KEY = process.env.FD_API_KEY;
  const FD_ENDPOINT = process.env.FD_ENDPOINT;
  const URL = `https://${FD_ENDPOINT}.freshdesk.com/${PATH}`;
  const ENCODING_METHOD = 'base64';
  const AUTHORIZATION_KEY =
    'Basic ' +
    new Buffer.from(FD_API_KEY + ':' + 'X').toString(ENCODING_METHOD);

  console.log(FD_API_KEY, FD_ENDPOINT);
  const headers = {
    Authorization: AUTHORIZATION_KEY,
    'Content-Type': 'application/json',
  };
  console.log(headers);

  const config = {
    headers,
  };

  // const config = {
  //   headers,
  //   body: JSON.stringify(body),
  //   method: 'POST',
  // };

  const allFreshDeskTickets = {
    access_token: data.access_token,
  };
  console.log(allFreshDeskTickets);
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const authToken = await jwt.verify(
    allFreshDeskTickets.access_token,
    ACCESS_TOKEN_SECRET,
    (error, authData) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log(authData);
        return authData;
      }
    }
  );

  try {
    const response = await fetch(URL, config);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data);

    const msg = `All Customer Tickets for User: ` + authToken.email;
    console.log(msg);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data, msg }),
    };
  } catch (error) {
    const msg = `Failed to Fetch Customer Tickets for User: ` + authToken.email;
    console.log(msg);
    console.log(error);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg, error }),
    };
  }
};
// oneTouch Customers
const addCustomer = async (db, data) => {
  const addCustomer = {
    access_token: data.access_token,
    oneTouchCustomer: data.oneTouchCustomer,
  };
  console.log(addCustomer);
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const authToken = await jwt.verify(
    addCustomer.access_token,
    ACCESS_TOKEN_SECRET,
    (error, authData) => {
      if (error) {
        console.log(error);
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
      'oneTouchSuperUser.id': authToken._id,
      'oneTouchCustomer.customerEmail':
        addCustomer.oneTouchCustomer.customerEmail,
    })
    .toArray();
  console.log(user);
  const userExist = user.length > 0;

  const oneTouchCustomer = {
    oneTouchSuperUser: { id: authToken._id },
    oneTouchCustomer: addCustomer.oneTouchCustomer,
  };

  if (authToken && !userExist && addCustomer.oneTouchCustomer) {
    await db
      .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
      .insertMany([oneTouchCustomer]);
    const msg =
      `User successfully added to DB with email: ` +
      addCustomer.oneTouchCustomer.customerEmail;
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
    const msg =
      `User Already Exists With email: ` +
      addCustomer.oneTouchCustomer.customerEmail;
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
const allCustomers = async (db, data) => {
  const dbData = await db
    .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
    .find()
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
  } catch (error) {
    console.log(error);
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(error),
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
    (error, authData) => {
      if (error) {
        console.log(error);
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
    .find({ 'oneTouchSuperUser.id': authToken._id })
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
  } catch (error) {
    console.log(error);
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(error),
    };
  }
};
const findCustomerById = async (db, data) => {
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
const activateContract = async (db, data) => {
  const body = data.oneTouchBroadband;

  console.log('Body Data: ', body);
  const oneTouchContract = {
    id: body._id,
    oneTouchBroadband: body.oneTouchBroadband,
    contractStartDay: body.oneTouchBroadband.contractStartDay,
  };
  const contractID = new ObjectId(oneTouchContract.id);
  const contract = await db
    .collection(COLLECTION_ONE_TOUCH_BROADBAND)
    .find({ _id: contractID })
    .toArray();

  const contractValid = contract.length > 0;

  if (contractValid) {
    const query = { _id: contractID };
    const update = {
      $set: { oneTouchBroadband: oneTouchContract.oneTouchBroadband },
    };
    const options = { upsert: true };

    await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .updateOne(query, update, options);
    const msg =
      `Contract successfully been activated. Start Day: ` +
      oneTouchContract.contractStartDay;
    console.log(msg);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oneTouchContract: body, msg: msg }),
    };
  } else {
    const msg =
      `Error activating contract for: ` +
      oneTouchContract.oneTouchBroadband.name;
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

// oneTouch contract endPoints
const findContractById = async (db, data) => {
  const findContract = {
    id: data.findOneById,
  };

  const contractID = new ObjectId(findContract.id);
  const contractData = await db
    .collection(COLLECTION_ONE_TOUCH_BROADBAND)
    .find({ _id: contractID })
    .toArray();
  console.log(contractData);

  const customerId = contractData[0].oneTouchCustomer.id;
  const superUserId = contractData[0].oneTouchSuperUser.id;
  const customerObjectId = new ObjectId(customerId);
  const superUserObjectId = new ObjectId(superUserId);
  console.log(customerObjectId, superUserObjectId);

  // fetching customer object from db
  const oneTouchCustomer = await db
    .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
    .find({ _id: customerObjectId })
    .toArray();
  contractData[0]['oneTouchCustomer'] = oneTouchCustomer[0];

  // fetching superUser object from db
  const oneTouchSuperUser = await db
    .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
    .find({ _id: superUserObjectId })
    .toArray();
  contractData[0]['oneTouchSuperUser'] = oneTouchSuperUser[0];
  delete contractData[0]['oneTouchSuperUser']['password'];

  const contractValid = contractData.length > 0;
  console.table(contractValid);

  if (contractValid) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractData[0]),
    };
  } else {
    const msg = `Error finding contract. Contract ID: ` + findContract.id;
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
  } catch (error) {
    console.log(error);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(error),
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
  } catch (error) {
    console.log(error);
    return {
      statusCode: 404,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(error),
    };
  }
};
// gmail & iONOS email account
const emailTemplateForm = (name, email, subject, description) => {
  const tableCellStyle = `style="border: 1px solid #c1c1c1;
                          color: #2b2b2b;
                          font-size: 16px;
                          font-weight: normal;
                          padding: 20px;
                          text-align: justify;
                          text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);"`;
  return `<div style="display: grid; justify-content: center">
            <table style="background-color: #f4f4f4; min-width: 400px; margin: 20px">
              <tr>
                <th
                colspan="2"
                style="
                  color: #f4f4f4;
                  background: #2b2b2b;
                  border: 1px solid #343a45;
                  text-align: center;
                  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
                  vertical-align: middle;
                  padding: 10px;
                "
                >
                  <div style="display: grid; justify-content: center">
                    <img src="cid:ndgLogo" alt="ndgLogo"/>
                  </div>
                </th>
              </tr>

              <tr style="padding: 5px">
                <th
                ${tableCellStyle}
                >
                  Name
                </th>
                <th
                  ${tableCellStyle}
                >
                  ${name}
                </th>
              </tr>
              <tr style="padding: 5px">
                <th
                  ${tableCellStyle}
                >
                  Email
                </th>
                <th
                  ${tableCellStyle}
                >
                  ${email}
                </th>
              </tr>
              <tr style="padding: 5px">
                <th
                  ${tableCellStyle}
                >
                  Subject
                </th>
                <th
                  ${tableCellStyle}
                >
                  ${subject}
                </th>
              </tr>
              <tr style="padding: 5px">
                <th
                  ${tableCellStyle}
                >
                  Description
                </th>
                <th
                  ${tableCellStyle}
                >
                  ${description}
                </th>
              </tr>
            </table>
            </div>`;
}; //Img url same cid value as in the html img src
const iONOS = async (body, callback) => {
  console.log('Credentials obtained, sending email via iONOS...');

  // Proxy Server Agent configuration
  const QUOTAGUARD_STATIC_URL = process.env.QUOTAGUARD_STATIC_URL;
  const proxyAgent = new HttpsProxyAgent(QUOTAGUARD_STATIC_URL);

  const emailTemplate = emailTemplateForm(
    body.name,
    body.email,
    body.subject,
    body.description
  );

  const authToken = await jwt.verify(
    body.access_token,
    ACCESS_TOKEN_SECRET,
    (error, authData) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log(authData);
        return authData;
      }
    }
  );

  const email = authToken.email;
  const subject = body.subject;

  const transporter = nodemailer.createTransport({
    host: process.env.IONOS_HOST,
    port: process.env.IONOS_PORT,
    secure: process.env.IONOS_SECURE,
    proxy: proxyAgent,
    auth: {
      user: process.env.IONOS_USER, // replace with your email
      pass: process.env.IONOS_PASS, // replace with your password
    },
  });

  const mailOptions = {
    from: `"oneTouch Portal | " <${process.env.IONOS_USER}>`, // replace with your email
    to: email, // cc mailing list
    bcc: process.env.IONOS_MAILING_LIST, // bcc mailing list
    subject: `${subject}`,
    html: emailTemplate,
    attachments: [
      {
        filename: 'NDGlogo.png',
        path: __dirname + '/../dist/images/NDG.png',
        cid: 'ndgLogo', //same cid value as in the html img src
      },
    ],
  };

  let iONOSEmail = true;
  let msg;
  transporter.sendMail(mailOptions, (erroror, iONOSInfo) => {
    if (erroror) {
      iONOSEmail = false;
      msg = erroror;
      console.log(erroror);

      callback(erroror);
    } else {
      msg = iONOSInfo;
      console.log(info);
      console.log('Message sent: %s', info.messageId);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body),
      });
    }
  });

  if (iONOSEmail) {
    console.log(
      `Email sent successfully to: | `,
      email,
      process.env.IONOS_MAILING_LIST
    );

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  } else {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  }
};
const gmail = async (body, callback) => {
  console.log('Credentials obtained, sending email via iONOS...');

  // Proxy Server Agent configuration
  const QUOTAGUARD_STATIC_URL = process.env.QUOTAGUARD_STATIC_URL;
  const proxyAgent = new HttpsProxyAgent(QUOTAGUARD_STATIC_URL);

  const emailTemplate = emailTemplateForm(
    body.name,
    body.email,
    body.subject,
    body.description
  );

  const authToken = await jwt.verify(
    body.access_token,
    ACCESS_TOKEN_SECRET,
    (error, authData) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log(authData);
        return authData;
      }
    }
  );

  const email = authToken.email;
  const subject = body.subject;
  // const mailList = [`${email}`, `${process.env.GMAIL_MAILING_LIST}`];

  const transporter = nodemailer.createTransport({
    service: process.env.GMAIL_SERVICE, // replace with service provider
    proxy: proxyAgent,
    auth: {
      user: process.env.GMAIL_NAME, // replace with your email
      pass: process.env.GMAIL_PASSWORD, // replace with your password
    },
  });

  const mailOptions = {
    from: `"oneTouch Portal | " <${process.env.IONOS_USER}>`, // replace with your email
    to: email, // cc mailing list
    bcc: process.env.GMAIL_MAILING_LIST, // bcc mailing list
    subject: `${subject}`,
    html: emailTemplate,
    attachments: [
      {
        filename: 'NDGlogo.png',
        path: __dirname + '/../dist/images/NDG.png',
        cid: 'ndgLogo', //same cid value as in the html img src
      },
    ],
  };

  let gmail = true;
  let msg;
  transporter.sendMail(mailOptions, (erroror, gmailInfo) => {
    if (erroror) {
      gmail = false;
      msg = erroror;
      console.log(erroror);

      callback(erroror);
    } else {
      msg = gmailInfo;
      console.log(gmailInfo);
      console.log('Message sent: %s', gmailInfo.messageId);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body),
      });
    }
  });

  if (gmail) {
    console.log(
      `Email sent successfully to: | `,
      email,
      process.env.IONOS_MAILING_LIST
    );

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  } else {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg }),
    };
  }
};

// Error page handling response endpoints
const oneTouchPortalHTML = [
  '/',
  '/views/oneTouch/add-customer',
  '/views/oneTouch/dev',
  '/views/oneTouch/index',
  '/views/oneTouch/live-connections',
  '/views/oneTouch/user-management',
  '/views/oneTouch/one-touch-signup',
  '/views/oneTouch/connection-checker',
  '/views/oneTouch/raise-ticket',
  '/views/oneTouch/support-docs',
  '/views/oneTouch/coming-soon',
];

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  const path = event.path;
  if (event.httpMethod) console.log(path);
  if (event) console.log(JSON.parse(event.body));

  let body = null;
  if (event.body) body = JSON.parse(event.body);

  // Redirects to erroror html
  if (event.httpMethod === 'GET' && !oneTouchPortalHTML.includes(path)) {
    console.log('Path end point not found');
    console.log(path);
    return {
      statusCode: 301,
      headers: {
        Location: '/views/oneTouch/erroror.html',
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
    case '/oneTouch/orders/userPlacedOrders':
      return userPlacedOrders(db, body);
    case '/oneTouch/orders/oneTouchBroadband':
      return oneTouchBroadband(db, body);
    case '/oneTouch/orders/addOrder':
      return addOrder(db, body);
    case '/oneTouch/orders/deleteOrder':
      return deleteOrder(db, body);
    // oneTouch freshDesk endPoints
    case '/oneTouch/tickets/allFreshDeskTickets':
      return allFreshDeskTickets(db, body);
    case '/oneTouch/tickets/oneTouchCreateTicket':
      return allFreshDeskTickets(db, body);
    // oneTouch customer endPoints
    case '/oneTouch/customer/addCustomer':
      return addCustomer(db, body);
    case '/oneTouch/customer/deleteCustomer':
      return deleteCustomer(db, body);
    case '/oneTouch/customer/filterCustomers':
      return filterCustomers(db, body);
    case '/oneTouch/customer/allCustomers':
      return allCustomers(db, body);
    case '/oneTouch/customer/findCustomerById':
      return findCustomerById(db, body);
    // oneTouch contract endPoints
    case '/oneTouch/contract/findContractById':
      return findContractById(db, body);
    case '/oneTouch/contract/activateContract':
      return activateContract(db, body);
    // icUK endPoints
    case '/oneTouch/icUK/addressesForPostcodeProvided':
      return addressesForPostcodeProvided(body);
    case '/oneTouch/icUK/broadbandAvailability':
      return broadbandAvailability(body);
    // gmail & iONOS endPoints
    case '/oneTouch/iONOS':
      return iONOS(body, callback);
    case '/oneTouch/gmail':
      return gmail(body, callback);

    default:
      return { statusCode: 400 };
  }
};
