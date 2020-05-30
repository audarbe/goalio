const User = require("../models/user");

module.exports = {
  index,
  logOut,
};

function index(req, res, next) {
  User.find().exec(function (err, users) {
    if (err) return next(err);
    res.render("index", {
      users,
      name: req.query.name,
      user: req.user,
    });
  });
}

function logOut(req, res) {
  req.logout();
  res.redirect("/");
}
