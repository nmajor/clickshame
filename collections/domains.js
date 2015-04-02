var app = require('../app');
var bookshelf = app.get('bookshelf');
var Domain = require('../models/domain');

var Domains = bookshelf.Collection.extend({
  model: Domain
});

module.exports = Domains;