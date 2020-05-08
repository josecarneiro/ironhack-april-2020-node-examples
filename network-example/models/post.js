const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 140,
      required: true
    },
    message: {
      type: String,
      maxlength: 5000
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Channel'
    }
    // date: {
    //   type: Date,
    //   default: () => new Date()
    // }
  },
  {
    // timestamps: true
    timestamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
