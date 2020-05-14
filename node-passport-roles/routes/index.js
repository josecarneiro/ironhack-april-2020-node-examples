'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

// const routeRoleGuard = allowedRoles => (req, res, next) => {
//   if (allowedRoles.includes(req.user.role)) {
//     next();
//   } else {
//     next(new Error('User is not authorized to see that page.'));
//   }
// };

function routeRoleGuard(allowedRoles) {
  return function(req, res, next) {
    if (allowedRoles.includes(req.user.role)) {
      next();
    } else {
      next(new Error('User is not authorized to see that page.'));
    }
  };
}

router.get(
  '/admin',
  routeGuard,
  routeRoleGuard(['program_manager', 'teacher']),
  (req, res, next) => {
    res.render('admin');
  }
);

const User = require('./../models/user');

router.get('/profile/edit', (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      res.render('edit', { profile: user });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/profile/edit', (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    email: req.body.email,
    name: req.body.name
  })
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
