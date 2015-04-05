var express = require('express');
var router = express.Router();
var referencesController = require('../controllers/references');

/* GET strikes index. */
router.get('/', referencesController.index);

module.exports = router;
