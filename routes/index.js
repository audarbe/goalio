const User = require("../models/user");
var express = require("express");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  User.find().exec(function (err, users) {
    if (err) return next(err);
    res.render("index", {
      users,
      name: req.query.name,
      user: req.user,
    });
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", function (req, res) {
  console.log("user logged out");
  req.logout();
  res.redirect("/");
});

module.exports = router;
