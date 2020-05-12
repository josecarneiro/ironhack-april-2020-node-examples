const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String
    },
    picture: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'updatedDate'
    }
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
