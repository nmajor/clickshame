var config = require('../config/config');
var Bookshelf = require('../config/dbconnect')(config);
var Strike = require('../models/strike');

var Strikes = Bookshelf.Collection.extend({
  model: Strike
});

module.exports = Strikes;