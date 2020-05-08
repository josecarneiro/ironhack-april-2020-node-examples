const express = require('express');

const Channel = require('./../models/channel');
const Post = require('./../models/post');

const channelRouter = new express.Router();

channelRouter.get('/create', (req, res) => {
  res.render('channel/create');
});

channelRouter.post('/create', (req, res, next) => {
  const name = req.body.name;

  Channel.findOne({ name })
    .then(document => {
      if (!document) {
        return Channel.create({
          name
        });
      } else {
        const error = new Error("There's already a channel with that name.");
        return Promise.reject(error);
      }
    })
    .then(channel => {
      const id = channel._id;
      res.redirect('/channel/' + id);
    })
    .catch(error => {
      next(error);
    });
});

channelRouter.get('/:channelId', (req, res, next) => {
  const channelId = req.params.channelId;

  let posts;

  Post.find({
    channel: channelId
  })
    .then(result => {
      posts = result;
      return Channel.findById(channelId);
    })
    .then(channel => {
      res.render('channel/single', { channel, posts });
    })
    .catch(error => {
      next(error);
    });
});

channelRouter.get('/:channelId/post/create', (req, res) => {
  res.render('channel/post/create');
});

channelRouter.post('/:channelId/post/create', (req, res, next) => {
  const channelId = req.params.channelId;

  const title = req.body.title;
  const message = req.body.message;

  return Post.create({
    title,
    message,
    channel: channelId
  })
    .then(post => {
      res.redirect(`/channel/${channelId}/post/${post._id}`);
    })
    .catch(error => {
      next(error);
    });
});

channelRouter.get('/:channelId/post/:postId', (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then(post => {
      res.render('channel/post/single', { post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = channelRouter;
