var express = require('express');
var router = express.Router();
var milestonesCtrl = require('../controllers/milestones');

router.post('/goals/:id/milestones', milestonesCtrl.create)
router.delete('/goals/:id/milestones/:id', milestonesCtrl.delete)


module.exports = router;