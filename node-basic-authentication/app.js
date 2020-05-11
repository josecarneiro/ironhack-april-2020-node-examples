const express = require('express');
const path = require('path');
const authenticationRouter = require('./routes/authentication');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/authentication', authenticationRouter);

// Catch all error handler

app.use((error, req, res, next) => {
  // console.log('Got to catch all error handler', error);
  res.render('error', { error });
});

module.exports = app;
