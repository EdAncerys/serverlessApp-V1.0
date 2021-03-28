const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const jwt = require('jsonwebtoken');

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

const oneTouchQueryAllUsers = async (db) => {
  const dbData = await db.collection(COLLECTION).find({}).toArray();
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

const oneTouchAddCustomer = async (db, data) => {
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
    .collection(COLLECTION)
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

    await db.collection(COLLECTION).insertMany([data]);
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

const oneTouchDeleteCustomer = async (db, data) => {
  const deleteCustomer = {
    _id: data.id,
  };
  const userID = new ObjectId(deleteCustomer._id);
  const user = await db.collection(COLLECTION).find({ _id: userID }).toArray();
  const userExist = user.length > 0;

  if (userExist && deleteCustomer._id) {
    const msg =
      `User been successfully deleted from DB with ID: ` + deleteCustomer._id;
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

const oneTouchFilterCustomers = async (db, data) => {
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
    .collection(COLLECTION)
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

const oneTouchFindCustomersById = async (db, data) => {
  const findCustomer = {
    id: data.findOneById,
  };

  const customerID = new ObjectId(findCustomer.id);
  const customerData = await db
    .collection(COLLECTION)
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

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let body;
  if (event.body) body = JSON.parse(event.body);
  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case 'GET':
      return oneTouchQueryAllUsers(db);
    case 'POST':
      if (body.customerEmail) {
        return oneTouchAddCustomer(db, body);
      }
      if (body.findOneById) {
        return oneTouchFindCustomersById(db, body);
      }
      return oneTouchFilterCustomers(db, body);
    case 'DELETE':
      return oneTouchDeleteCustomer(db, JSON.parse(event.body));
    case 'PATCH':
      return oneTouchUpdateUser(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};
