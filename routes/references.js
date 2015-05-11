var express = require('express');
var router = express.Router();
var referencesController = require('../controllers/references');

/* GET strikes index. */
router.get('/top', referencesController.top);
router.get('/find', referencesController.find);

module.exports = router;
