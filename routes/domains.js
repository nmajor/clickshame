var express = require('express');
var router = express.Router();
var domainsController = require('../controllers/domains');

/* GET strikes index. */
router.get('/top', domainsController.top);
router.get('/find', domainsController.find);
router.post('/find', domainsController.find);

module.exports = router;
