const User = require('../models/user');

module.exports = {
  index,
};

function index(req, res, next) {
  User.find().exec(function (err, users) {
    if (err) return next(err);
    res.render('index', {
      users,
      user: req.user,
    });
  });
}