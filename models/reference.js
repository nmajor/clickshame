var config = require('../config/config');
var bookshelf = require('../config/dbconnect')(config);

var Reference = bookshelf.Model.extend({
  tableName: 'references',
  strikes: function(){
    return this.hasMany(Strike);
  },
  domain: function() {
    return this.belongsTo(Domain);
  },
});

module.exports = Reference;