var config = require('../config/config');
var Bookshelf = require('../config/dbconnect')(config);
Bookshelf.plugin('registry');

// require('./strike');
// require('./domain');
// require('./identity');

var Reference = Bookshelf.Model.extend({
  tableName: 'references',
  strikes: function(){
    return this.hasMany(Strike);
  },
  domain: function() {
    return this.belongsTo(Domain);
  },

  updateScore: function() {
    var Strike = require('./strike');
    var this_reference = this;

    Strike.countReferenceStrikes(this_reference)
    .then(function(count){
      this_reference.set('score', count);
    });
    // .then(function(){ this_reference.save() });
  },
});

module.exports = Bookshelf.model('Reference', Reference);