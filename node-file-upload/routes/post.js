const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');
const Post = require('./../models/post');
const routeGuard = require('./../middleware/route-guard');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'april-2020'
});

const uploader = multer({ storage });
// const uploader = multer({ dest: 'tmp' }); // Storing locally in tmp folder

const postRouter = new express.Router();

postRouter.get('/create', routeGuard, (req, res, next) => {
  res.render('post/create');
});

postRouter.post('/create', routeGuard, uploader.single('picture'), (req, res, next) => {
  const message = req.body.message;
  const picture = req.file.url;
  // const userId = req.session.userId;
  const userId = req.user._id;
  Post.create({
    message,
    picture,
    creator: userId
  })
    .then(post => {
      res.redirect('/post/list');
    })
    .catch(error => {
      next(error);
    });
});

postRouter.get('/list', (req, res, next) => {
  Post.find()
    .sort({ creationDate: -1 })
    // .limit(2)
    // .skip(1)
    .populate('creator')
    .then(posts => {
      console.log(posts);
      res.render('post/list', { posts });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = postRouter;
