var express = require('express');
var strikesController = require('../controllers/strikes');
var router = express.Router();

/* GET home page. */
router.get('/strikes', strikesController.indexStrikes);

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
