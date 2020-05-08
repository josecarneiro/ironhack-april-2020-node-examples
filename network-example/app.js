const express = require('express');
const hbs = require('hbs');
const path = require('path');
const nodeSassMiddleware = require('node-sass-middleware');
const channelRouter = require('./routes/channel');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Custom middleware
// app.use((req, res, next) => {
//   console.log('Received request', req.method, req.url);
//   next(new Error('There was a random error right here'));
// });

app.use(
  nodeSassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    outputStyle: 'nested',
    force: true
  })
);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const Channel = require('./models/channel');

app.get('/', (req, res, next) => {
  Channel.find()
    .then(channels => {
      res.render('home', { channels });
    })
    .catch(error => {
      next(error);
    });
});

app.use('/channel', channelRouter);

// Catch all error handler

app.use((error, req, res, next) => {
  // console.log('Got to catch all error handler', error);
  res.render('error', { error });
});

module.exports = app;
