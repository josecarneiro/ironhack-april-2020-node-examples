'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
