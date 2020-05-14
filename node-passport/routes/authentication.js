'use strict';

const { Router } = require('express');
const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

// router.post('/sign-up', (req, res, next) => {});

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

// router.post('/sign-in', (req, res, next) => {});

// router.post('/sign-out', (req, res, next) => {});

module.exports = router;
