var app = require('../app');
var bookshelf = app.get('bookshelf');
var Reference = require('../models/reference');

var References = bookshelf.Collection.extend({
  model: Reference
});

module.exports = References;