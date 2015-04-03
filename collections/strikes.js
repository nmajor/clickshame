var config = require('../config/config');
var bookshelf = require('../config/dbconnect')(config);
var Strike = require('../models/strike');

var Strikes = bookshelf.Collection.extend({
  model: Strike
});

module.exports = Strikes;