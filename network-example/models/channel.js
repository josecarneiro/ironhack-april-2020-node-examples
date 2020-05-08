const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    lowercase: true
  }
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
