var config = require('../config/config');
var bookshelf = require('../config/dbconnect')(config);
var Domain = require('../models/domain');

var Domains = bookshelf.Collection.extend({
  model: Domain
});

module.exports = Domains;