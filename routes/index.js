var express = require("express");
var router = express.Router();
const passport = require("passport");
const indexCtrl = require("../controllers/index");

router.get("/", indexCtrl.index);
router.get("/logout", indexCtrl.logOut);

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

module.exports = router;
