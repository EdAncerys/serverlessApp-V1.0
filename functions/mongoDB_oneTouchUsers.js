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

const queryDatabase = async (db) => {
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
    .find({ email: `${addUser.email}` });

  if (!user && addUser.name && addUser.email && addUser.password) {
    await db.collection(COLLECTION).insertMany([data]);
    return { statusCode: 201, message: 'User been added successfully' };
  } else {
    return { statusCode: 422, message: 'Error adding user' };
  }
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);

  switch (event.httpMethod) {
    case 'GET':
      return queryDatabase(db);
    case 'POST':
      return oneTouchAddUser(db, JSON.parse(event.body));
    default:
      return { statusCode: 400 };
  }
};
