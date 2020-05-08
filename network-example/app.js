const express = require('express');
const hbs = require('hbs');
const path = require('path');
const channelRouter = require('./routes/channel');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/channel', channelRouter);

module.exports = app;
