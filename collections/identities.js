var config = require('../config/config');
var bookshelf = require('../config/dbconnect')(config);
var Identity = require('../models/identity');

var Identities = bookshelf.Collection.extend({
  model: Identity
});

module.exports = Identities;