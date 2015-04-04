var config = require('../config/config');
var Bookshelf = require('../config/dbconnect')(config);
var Identity = require('../models/identity');

var Identities = Bookshelf.Collection.extend({
  model: Identity
});

module.exports = Identities;