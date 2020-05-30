// const User = require("../models/user");
// var express = require("express");
// const passport = require("passport");

// module.exports = {
//   index,
//   logIn,
//   authorize,
//   logOut,
// };

// function index(req, res, next) {
//   User.find().exec(function (err, users) {
//     if (err) return next(err);
//     res.render("index", {
//       users,
//       name: req.query.name,
//       user: req.user,
//     });
//   });
// }

// function logIn() {
//   "/auth/google",
//     passport.authenticate("google", {
//       scope: ["profile", "email"],
//     });
// }

// function authorize() {
//   passport.authenticate("google", {
//     successRedirect: "/",
//     failureRedirect: "/",
//   });
// }

// function logOut(req, res) {
//   req.logout();
//   res.redirect("/");
// }
