var express = require('express');
var router = express.Router();
var strikesController = require('../controllers/strikes');

/* GET strikes index. */
router.get('/', strikesController.index);
router.post('/', strikesController.create);

module.exports = router;
