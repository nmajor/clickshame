var app = require('../app');
var bookshelf = app.get('bookshelf');
var Strike = require('../models/strike');

var Strikes = bookshelf.Collection.extend({
  model: Strike
});

module.exports = Strikes;