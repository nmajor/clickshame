var express = require('express');
var router = express.Router();
var strikesController = require('../controllers/strikes');

/* GET strikes index. */
router.get('/recent', strikesController.recent);
router.post('/', strikesController.create);

module.exports = router;
