const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongoose = require('mongoose');
const deserializeUser = require('./middleware/deserialize-user');
const bindUserDocumentToResponseLocals = require('./middleware/bind-user-to-response-locals');
const routeGuard = require('./middleware/route-guard');

const mongoStore = connectMongo(expressSession);

const authenticationRouter = require('./routes/authentication');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: 'abc',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000 // Time that the cookie lives for,
      // secure: true,
      // serverOnly: true
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 // Seconds between connection reset to mongodb
    })
  })
);

app.use(deserializeUser);
app.use(bindUserDocumentToResponseLocals);

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/authentication', authenticationRouter);

app.get('/profile', routeGuard, (req, res) => {
  res.render('profile');
});

// Catch all error handler

app.use((error, req, res, next) => {
  // console.log('Got to catch all error handler', error);
  res.render('error', { error });
});

module.exports = app;
