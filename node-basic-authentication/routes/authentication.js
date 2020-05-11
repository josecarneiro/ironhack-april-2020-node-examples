const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');

const authenticationRouter = new express.Router();

authenticationRouter.get('/sign-up', (req, res) => {
  res.render('sign-up');
});

authenticationRouter.post('/sign-up', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt
    .hash(password, 10)
    .then(hashAndSalt => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hashAndSalt
      });
    })
    .then(user => {
      // Serializing the user
      req.session.userId = user._id;
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

authenticationRouter.get('/sign-in', (req, res) => {
  res.render('sign-in');
});

authenticationRouter.post('/sign-in', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;

  User.findOne({
    email
  })
    .then(document => {
      user = document;
      return bcrypt.compare(password, user.passwordHashAndSalt);
    })
    .then(comparison => {
      if (comparison) {
        // Serializing the user
        req.session.userId = user._id;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('PASSWORD_DOES_NOT_MATCH'));
      }
    })
    .catch(error => {
      next(error);
    });
});

authenticationRouter.post('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = authenticationRouter;
