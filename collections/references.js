var config = require('../config/config');
var bookshelf = require('../config/dbconnect')(config);
var Reference = require('../models/reference');

var References = bookshelf.Collection.extend({
  model: Reference
});

module.exports = References;