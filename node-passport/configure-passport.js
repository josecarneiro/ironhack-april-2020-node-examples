'use strict';

const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');

const LocalStrategy = passportLocal.Strategy;

const User = require('./models/user');

// 3 - Create a serialization and deserialization mechanism for passport

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

// 4 - We need to create strategies for sign in and sign up, based on the the strategy we want to use.

// In the docs, the paramater we're calling callback is also named as `cb`, `done`, `func`, `next`

passport.use(
  'sign-up',
  new LocalStrategy({}, (username, password, callback) => {
    bcrypt
      .hash(password, 10)
      .then(hashAndSalt => {
        return User.create({
          username,
          passwordHash: hashAndSalt
        });
      })
      .then(user => {
        callback(null, user);
      })
      .catch(error => {
        callback(error);
      });
  })
);

passport.use(
  'sign-in',
  new LocalStrategy({}, (username, password, callback) => {
    let user;
    User.findOne({
      username
    })
      .then(document => {
        user = document;
        return bcrypt.compare(password, user.passwordHash);
      })
      .then(result => {
        if (result) {
          callback(null, user);
        } else {
          return Promise.reject(new Error('Passwords do not match.'));
        }
      })
      .catch(error => {
        callback(error);
      });
  })
);
