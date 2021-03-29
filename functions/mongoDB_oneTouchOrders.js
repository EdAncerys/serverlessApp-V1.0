const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
const jwt = require('jsonwebtoken');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'oneTouchDB';
const COLLECTION = 'oneTouchOrders';

let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const oneTouchQueryAllOrders = async (db) => {
  const dbData = await db.collection(COLLECTION).find({}).toArray();
  console.table(dbData);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dbData),
  };
};

const oneTouchFilterOrder = async (db, data) => {
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
    const msg = `Error accured finding orders for: ` + authToken.email;
    console.log(msg);

    return {
      statusCode: 403,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: msg }),
    };
  }
};

const oneTouchAddOrder = async (db, data) => {
  console.log(data);
  const createOrder = {
    access_token: data.access_token,
    broadband_name: data.oneTouchData.name,
  };

  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
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

const oneTouchDeleteOrder = async (db, data) => {
  const deleteOrder = {
    _id: data._id,
  };
  const orderID = new ObjectId(deleteOrder._id);
  const order = await db
    .collection(COLLECTION)
    .find({ _id: orderID })
    .toArray();
  const orderValid = order.length > 0;

  if (orderValid && deleteOrder._id) {
    const msg =
      `Oder been successfully deleted from DB. Order ID: ` + deleteOrder._id;
    await db.collection(COLLECTION).deleteOne({ _id: orderID });
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

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let body;
  if (event.body) body = JSON.parse(event.body);
  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case 'GET':
      return oneTouchQueryAllOrders(db);
    case 'POST':
      if (body.oneTouchData && body.access_token)
        return oneTouchAddOrder(db, body);
      if (body.access_token) return oneTouchFilterOrder(db, body);
    case 'DELETE':
      return oneTouchDeleteOrder(db, body);
    case 'PATCH':
      return oneTouchUpdateOrder(db, body);
    default:
      return { statusCode: 400 };
  }
};
