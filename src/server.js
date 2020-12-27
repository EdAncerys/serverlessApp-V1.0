const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

// Middleware
app.use('/.netlify/functions/server', router);

app.use(express.static(__dirname + '/dist'));
app.engine('html', require('ejs').renderFile);
// app.set('views', __dirname + '/public/views');
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

// Routes
router.get('/', (req, res) => {
  res.send('GET request to the Serverless App homepage');
});
router.get('/json', (req, res) => {
  res.json({ data: 'Hello World' });
});
router.get('/index', (req, res) => {
  // res.send('GET request to the index page');
  res.render('index.html', { form: 'login form' });
});

// In order to alow lambda to run exporting handler function
module.exports = app;
module.exports.handler = serverless(app);

// Express app port No
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
