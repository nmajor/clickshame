var config = require('../config/config');
var Bookshelf = require('../config/dbconnect')(config);
var Domain = require('../models/domain');

var Domains = Bookshelf.Collection.extend({
  model: Domain
});

module.exports = Domains;