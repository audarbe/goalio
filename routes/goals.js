var express = require('express');
var router = express.Router();
var goalsCtrl = require('../controllers/goals');

router.get('/new', goalsCtrl.new);
router.get('/:id', goalsCtrl.show);
router.get('/', goalsCtrl.index);
router.post('/', goalsCtrl.create)
router.delete('/:id', goalsCtrl.delete);
router.get('/:id/edit', goalsCtrl.edit)
router.put('/:id', goalsCtrl.update)

module.exports = router;