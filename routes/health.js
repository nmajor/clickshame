var express = require('express');
var router = express.Router();

/* GET strikes index. */
router.get('/', function(req, res) {
  res.send('OK');
});

module.exports = router;