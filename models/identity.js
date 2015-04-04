var config = require('../config/config');
var Bookshelf = require('../config/dbconnect')(config);
Bookshelf.plugin('registry');
var stringHelper = require('../helpers/string');

// require('./domain');
// require('./reference');
// require('./strike');

var Identity = Bookshelf.Model.extend({
  tableName: 'identities',
  strikes: function(){
    return this.hasMany(Strike);
  },
  initialize: function() {
    this.on('creating', this.setKey);
  },
  setKey: function() {
    this.set('key', stringHelper.randomString(100));
  }
});

module.exports = Bookshelf.model('Identity', Identity);