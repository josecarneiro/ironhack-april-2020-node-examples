const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

const authenticationRouter = new express.Router();

authenticationRouter.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

authenticationRouter.post('/sign-up', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, 10)
    .then(hashAndSalt => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hashAndSalt
      });
    })
    .then(user => {
      console.log(user);
      res.redirect('/');
    })
    .catch(error => {
      // ...
    })
});

authenticationRouter.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

authenticationRouter.post('/sign-in', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email
  })
    .then(user => {
      console.log(user);
      return bcrypt.compare(password, user.passwordHashAndSalt);
    })
    .then(comparison => {
      console.log(comparison);
      res.redirect('/');
    })
    .catch(error => {
      // error
    })
});

module.exports = authenticationRouter;
