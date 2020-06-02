var express = require('express');
var router = express.Router();
var goalsCtrl = require('../controllers/goals');

router.get('/goals/new', goalsCtrl.new);
router.get('/goals/:id', goalsCtrl.show);
router.get('/goals', goalsCtrl.index);
router.post('/goals', goalsCtrl.create)
router.delete('/goals/:id', goalsCtrl.delete);
router.get('/goals/:id/edit', goalsCtrl.edit)
router.put('/goals/:id', goalsCtrl.update)

module.exports = router;
