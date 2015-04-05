var express = require('express');
var router = express.Router();
var domainsController = require('../controllers/domains');

/* GET strikes index. */
router.get('/', domainsController.index);

module.exports = router;
