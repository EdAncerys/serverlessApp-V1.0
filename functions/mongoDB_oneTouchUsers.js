const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'oneTouchDB';
const COLLECTION = 'oneTouchUsers';

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

const oneTouchAddUser = async (db, data) => {
  const addUser = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  const user = await db
    .collection(COLLECTION)
    .find({ email: addUser.email })
    .toArray();

  if (!user[0] && addUser.name && addUser.email && addUser.password) {
    const msg = `User successfully added to DB with email: ` + addUser.email;
    console.log(msg);
    await db.collection(COLLECTION).insertMany([data]);
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data, msg: msg, dbUser: user }),
    };
  } else {
    const msg =
      `User Exists. Error adding user to DB with email: ` + addUser.email;
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

const oneTouchDeleteUser = async (db, data) => {
  const deleteUser = {
    _id: data._id,
    email: data.email,
  };
  const user = await db
    .collection(COLLECTION)
    .find({ email: deleteUser.email });
  console.log(user);
  if (!user && deleteUser._id) {
    const msg = `User been deleted with _id: ` + deleteUser._id;
    console.log(msg);
    await db
      .collection(COLLECTION)
      .deleteOne({ _id: ObjectId(`${deleteUser._id}`) });
    return { statusCode: 201, msg: msg };
  } else {
    const msg = `Error deleting user with _id: ` + deleteUser._id;
    console.log(msg);
    return { statusCode: 422, msg: msg };
  }
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case 'GET':
      return oneTouchQueryUsers(db);
    case 'POST':
      return oneTouchAddUser(db, JSON.parse(event.body));
    case 'DELETE':
      return oneTouchDeleteUser(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};
