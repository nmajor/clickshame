var config = require('../config/config');
var bookshelf = require('../config/dbconnect')(config);
var stringHelper = require('../helpers/string');

var Identity = bookshelf.Model.extend({
  tableName: 'identities',
  strikes: function(){
    return this.hasMany(Strike);
  },
  initialize: function() {
    this.on('creating', this.setKey);
  },
  setKey: function() {
    this.set('key', stringHelper.random(100));
  }
});

module.exports = Identity;