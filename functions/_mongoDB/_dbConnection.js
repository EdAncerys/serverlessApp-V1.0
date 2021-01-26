const MongoClient = require('mongodb').MongoClient;
require('dotenv').config(); // Enabling to load Environment variables from a .env File

let cachedDb;
export const connectToDatabase = async () => {
  if (cachedDb) {
    console.log('Using existing connection');
    return Promise.resolve(cachedDb);
  } else {
    return MongoClient.connect(process.env.MONGODB_URI, {
      native_parser: true,
      useUnifiedTopology: true,
    })
      .then((client) => {
        let db = client.db('Cluster0');
        console.log('Establishing new Database connection');
        cachedDb = db;
        return cachedDb;
      })
      .catch((error) => {
        console.log('Mongo Connection error');
        console.log(error);
      });
  }
};
