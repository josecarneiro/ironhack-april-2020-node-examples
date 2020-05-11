const User = require('./../models/user');

const deserializeUser = (req, res, next) => {
  // Deserialize the user
  const userId = req.session.userId;
  if(userId) {
    User.findById(userId)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(error => {
        next(error);
      });
  } else {
    next();
  }
};

module.exports = deserializeUser;
