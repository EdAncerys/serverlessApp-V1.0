const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Middleware
app.use('/.netlify/functions/server', router);

router.get('/', (req, res) => {
  res.send('GET request to the Serverless App homepage');
  // res.json({ data: 'Hello World' });
});

// In order to alow lambda to run exporting handler function
module.exports = app;
module.exports.handler = serverless(app);

// Express app port No
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
