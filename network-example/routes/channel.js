const express = require('express');
const Channel = require('./../models/channel');

const channelRouter = new express.Router();

channelRouter.get('/create', (req, res) => {
  res.render('channel/create');
});

channelRouter.post('/create', (req, res) => {
  const name = req.body.name;

  Channel.create({
    name
  })
    .then(channel => {
      console.log(channel);
      res.redirect('/');
    })
    .catch(error => {
      // Do something with error.
    });
});

channelRouter.get('/:channelId', (req, res) => {
  const channelId = req.params.channelId;

  Channel.findById(channelId)
    .then(channel => {
      console.log(channel);
      res.redirect('/');
    })
    .catch(error => {
      // ...
    });
});

module.exports = channelRouter;
