var config = require('../config/config');
var bookshelf = require('../config/dbconnect')(config);

var Domain = bookshelf.Model.extend({
  tableName: 'domains',
  references: function(){
    return this.hasMany(Reference);
  },
  strikes: function(){
    return this.hasMany(Strike);
  },
});

module.exports = Domain;