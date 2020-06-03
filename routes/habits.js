var express = require('express');
var router = express.Router();
var habitsCtrl = require('../controllers/habits');

router.post('/goals/:id/milestones/:id/habits', habitsCtrl.create);
router.put('/goals/:id/milestones/:id/habits/:id', habitsCtrl.update),

module.exports = router;