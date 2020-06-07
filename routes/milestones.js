var express = require('express');
var router = express.Router();
var milestonesCtrl = require('../controllers/milestones');

// router.get('/goals/:id/milestones/:id/edit', milestonesCtrl.edit)
router.get('/milestones', milestonesCtrl.index)
router.get('/goals/:id/milestones/:id', milestonesCtrl.show)
router.post('/goals/:id/milestones', milestonesCtrl.create)
router.delete('/goals/:id/milestones/:id', milestonesCtrl.delete)
router.put('/goals/:id/milestones/:id', milestonesCtrl.update)


module.exports = router;