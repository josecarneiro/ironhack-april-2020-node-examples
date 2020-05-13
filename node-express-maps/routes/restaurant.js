const express = require('express');
const Restaurant = require('./../models/restaurant');

const restaurantRouter = new express.Router();

restaurantRouter.get('/list', (req, res, next) => {
  Restaurant.find()
    .then(restaurants => {
      res.render('restaurant/list', { restaurants });
    })
    .catch(error => {
      next(error);
    });
});

restaurantRouter.get('/search', (req, res, next) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const distance = req.query.distance;

  const kilometersToDegrees = value => value / (20000 / 360);

  Restaurant.find()
    .where('location')
    .within()
    .circle({ center: [longitude, latitude], radius: kilometersToDegrees(distance) })
    .then(restaurants => {
      res.render('restaurant/list', { restaurants });
    })
    .catch(error => {
      next(error);
    });
});

restaurantRouter.get('/create', (req, res, next) => {
  res.render('restaurant/create');
});

restaurantRouter.get('/:restaurantId', (req, res, next) => {
  const restaurantId = req.params.restaurantId;

  Restaurant.findById(restaurantId)
    .then(restaurant => {
      res.render('restaurant/single', { restaurant });
    })
    .catch(error => {
      next(error);
    });
});

restaurantRouter.post('/create', (req, res, next) => {
  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  Restaurant.create({
    name,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(restaurant => {
      res.redirect('/restaurant/list');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = restaurantRouter;
