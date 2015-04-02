var app = require('../app');
var bookshelf = app.get('bookshelf');
var Identity = require('../models/identity');

var Identities = bookshelf.Collection.extend({
  model: Identity
});

module.exports = Identities;