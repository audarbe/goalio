var express = require('express');
var router = express.Router();
const indexCtrl = require('../controllers/index');
const passport = require('passport');

router.get('/', indexCtrl.index);
router.get('/logout', indexCtrl.logOut);

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

module.exports = router;
