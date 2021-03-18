const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;

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

const oneTouchQueryOrders = async (db) => {
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

const oneTouchAddOrder = async (db, data) => {
  console.log(data);
  const createOrder = {
    broadband_name: data.oneTouchData.name,
  };

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
  const orderValid = order[0];

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

const oneTouchUpdateOrder = async (db, data) => {
  const updateOrder = {
    _id: data._id,
    name: data.name,
    likely_down_speed: data.likely_down_speed,
    likely_up_speed: data.likely_up_speed,
    price: data.price,
    installation: data.installation,
  };
  const orderID = new ObjectId(updateOrder._id);
  const order = await db
    .collection(COLLECTION)
    .find({ _id: orderID })
    .toArray();
  const orderValid = order[0];

  if (orderValid && updateOrder._id) {
    const msg =
      `Order been successfully updated in DB. Order ID: ` + updateOrder._id;
    const oneTouchOrder = { _id: orderID };
    const updatedValues = {
      $set: {
        name: updateOrder.name,
        likely_down_speed: updateOrder.likely_down_speed,
        likely_up_speed: updateOrder.likely_up_speed,
        price: updateOrder.price,
        installation: updateOrder.installation,
      },
    };

    await db.collection(COLLECTION).updateOne(oneTouchOrder, updatedValues);
    console.log(msg);

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updateOrder: data, msg: msg }),
    };
  } else {
    const msg =
      `Order not found! Error updating order in DB. Order ID: ` +
      updateOrder._id;
    console.log(msg);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updateOrder: data, msg: msg }),
    };
  }
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case 'GET':
      return oneTouchQueryOrders(db);
    case 'POST':
      return oneTouchAddOrder(db, JSON.parse(event.body));
    case 'DELETE':
      return oneTouchDeleteOrder(db, JSON.parse(event.body));
    case 'PATCH':
      return oneTouchUpdateOrder(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};
