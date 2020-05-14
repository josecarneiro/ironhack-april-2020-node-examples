'use strict';

const { Router } = require('express');
const router = new Router();

const passport = require('passport');

// 5 - We need to tell our route handlers to use their corresponding strategies.

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-up'
  })
);

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-in'
  })
);

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
