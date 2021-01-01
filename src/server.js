const express = require('express');
const serverless = require('serverless-http');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const logger = require('./logger');

// Init Middleware
app.use(express.static(path.join(__dirname, '../dist'))); // Set static folder
app.use('/.netlify/functions/server', router); // Set route end point
// Setting view engine + body parser
app.set('views', __dirname + '/../dist');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(logger);

// Routes
app.get('/hello', (req, res) => {
  res.json({ data: 'Hello World' });
});
app.get('/route', (req, res) => {
  // res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  res.json({ data: 'This is A Route' });
});
router.get('/', (req, res) => {
  res.send('GET request from / ');
});
router.get('/homePage', logger, (req, res) => {
  res.send('GET request from /homePage ');
});
router.get('/index', (req, res) => {
  res.send('GET request from /index ');
});

router.post('/submit', (req, res) => {
  if (req.body) {
    const { username, password } = req.body;
    res.send(`POST request ${username} ${password}`);

    console.log(username, password);
  } else {
    res.send(`error`);

    console.log('error');
  }
  // console.log('submiting...', { username: username, password: password });
  // res.send('login');
});

// In order to alow lambda to run - exporting handler function
module.exports = app;
module.exports.handler = serverless(app);

// Express app port No
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
