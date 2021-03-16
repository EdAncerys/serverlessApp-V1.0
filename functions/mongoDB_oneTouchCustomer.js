const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'oneTouchDB';
const COLLECTION = 'oneTouchCustomer';

let cachedDb = null;

const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

const oneTouchQueryUsers = async (db) => {
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

const oneTouchAddCustomer = async (db, data) => {
  const addCustomer = {
    customerFullName: data.customerFullName,
    customerEmail: data.customerEmail,
  };
  const user = await db
    .collection(COLLECTION)
    .find({ customerEmail: addCustomer.customerEmail })
    .toArray();
  const userValid = !user[0];

  if (userValid && addCustomer.customerFullName && addCustomer.customerEmail) {
    const msg = `User successfully added to DB with email: ` + addCustomer.customerEmail;
    await db.collection(COLLECTION).insertMany([data]);
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
      `User Exists. Error adding user to DB with email: ` + addCustomer.customerEmail;
    console.log(msg);

    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data, msg: msg, dbUser: user }),
    };
  }
};

const oneTouchDeleteCustomer = async (db, data) => {
  const deleteCustomer = {
    _id: data._id,
    customerEmail: data.customerEmail,
  };
  const userID = new ObjectId(deleteCustomer._id);
  const user = await db.collection(COLLECTION).find({ _id: userID }).toArray();
  const userValid = user[0];

  if (userValid && deleteCustomer._id) {
    const msg =
      `User been successfully deleted from DB with email: ` + deleteCustomer.customerEmail;
    await db.collection(COLLECTION).deleteOne({ _id: userID });
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
      `User not found! Error deleting user from DB where email: ` +
      deleteCustomer.customerEmail;
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

const oneTouchUpdateUser = async (db, data) => {
  const updateUser = {
    email: data.email,
  };
  const user = await db
    .collection(COLLECTION)
    .find({ email: updateUser.email })
    .toArray();
  const userValid = user[0];

  if (userValid && updateUser.email) {
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

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case 'GET':
      return oneTouchQueryUsers(db);
    case 'POST':
      return oneTouchAddCustomer(db, JSON.parse(event.body));
    case 'DELETE':
      return oneTouchDeleteCustomer(db, JSON.parse(event.body));
    case 'PATCH':
      return oneTouchUpdateUser(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};
