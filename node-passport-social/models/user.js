'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String
  },
  name: {
    type: String
  },
  photo: {
    type: String
  },
  githubId: {
    type: String
  },
  username: {
    type: String
  },
  passwordHash: {
    type: String
  }
});

module.exports = mongoose.model('User', schema);
