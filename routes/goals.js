var express = require('express');
var router = express.Router();
var goalsCtrl = require('../controllers/goals');

/* GET users listing. */
router.get('/', goalsCtrl.index);
router.get('/new', goalsCtrl.new);
router.post('/', goalsCtrl.create)
router.delete('/:id', goalsCtrl.delete);

module.exports = router;
