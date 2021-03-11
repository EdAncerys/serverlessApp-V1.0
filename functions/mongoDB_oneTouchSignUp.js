const MongoClient = require('mongodb').MongoClient;

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

const oneTouchSignUp = async (db, data) => {
  const signUpUser = {
    oneTouchSignUpEmail: data.oneTouchSignUpEmail,
    oneTouchSignUpPassword: data.oneTouchSignUpPassword,
    oneTouchSignUpConfirmationPassword: data.oneTouchSignUpConfirmationPassword,
  };
  console.table(signUpUser);
  const user = await db
    .collection(COLLECTION)
    .find({ oneTouchSignUpEmail: signUpUser.oneTouchSignUpEmail })
    .toArray();
  console.log(user);

  const passwordMach =
    signUpUser.oneTouchSignUpPassword ===
    signUpUser.oneTouchSignUpConfirmationPassword;

  const userValid = !user[0];
  if (userValid && passwordMach) {
    await db.collection(COLLECTION).insertMany([data]);
    const msg =
      `You successfully logged in! Welcome to One Touch Portal ` +
      signUpUser.oneTouchSignUpEmail;
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
      `Access denied! User exists or passwords do not mach for: ` +
      signUpUser.oneTouchSignUpEmail;
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

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);
  const body = JSON.parse(event.body);

  switch (event.httpMethod) {
    case 'POST':
      return oneTouchSignUp(db, body);
    default:
      return { statusCode: 400 };
  }
};
