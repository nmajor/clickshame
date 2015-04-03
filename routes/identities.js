var express = require('express');
var router = express.Router();
var identitiesController = require('../controllers/identities');

/* GET strikes index. */
router.post('/', identitiesController.create);

module.exports = router;