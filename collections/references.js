var config = require('../config/config');
var Bookshelf = require('../config/dbconnect')(config);
var Reference = require('../models/reference');

var References = Bookshelf.Collection.extend({
  model: Reference
});

module.exports = References;