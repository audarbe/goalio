var express = require('express');
var router = express.Router();
var milestonesCtrl = require('../controllers/milestones');

router.post('/goals/:id/milestones', milestonesCtrl.create)


module.exports = router;