const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'oneTouchDB';
const COLLECTION = 'oneTouchSupperUsers';

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

    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: data, msg: msg }),
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
      body: JSON.stringify({ statusCode: 404, user: data, msg: msg }),
    };
  }
};

const eventFunc = (event, context, body) => {
  event.headers.jwt = 'my token value';
  console.log('Body', body);
  console.log('JWT', event.headers.jwt);
  console.log('Event Headers', event.headers);
  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: 'user', msg: 'Testing API' }),
  };
};

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  const body = JSON.parse(event.body);

  switch (event.httpMethod) {
    case 'POST':
      // return oneTouchLogin(db, body);
      return eventFunc(event, context, body);
    default:
      return { statusCode: 400 };
  }
};
