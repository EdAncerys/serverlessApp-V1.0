// import { connectToDatabase } from './_mongoDB/_dbConnection.js';

// module.exports = async (req, res) => {
//   if (req.method === 'GET') {
//     const db = await connectToDatabase();
//     const collection = await db.collection('Cluster0');

//     const users = await collection.find({}).toArray();

//     res.status(200).json({ users });
//   } else if (req.method === 'POST') {
//     const newuser = req.body;
//     const db = await connectToDatabase();
//     const collection = await db.collection('users');

//     const users = await collection.insertOne(newuser);
//     res.status(200).json({ users });
//   } else {
//     res.status(404).json({ status: 'ERROR ROUTE NOT FOUND' });
//   }
// };

exports.handler = (event, context, callback) => {
  const body = {
    data: 'Hello World!',
    responseCode: 200,
  };

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
};
