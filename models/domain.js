var config = require('../config/config');
var Bookshelf = require('../config/dbconnect')(config);
Bookshelf.plugin('registry');

// require('./strike');
// require('./reference');
// require('./identity');

var Domain = Bookshelf.Model.extend({
  tableName: 'domains',
  references: function() {
    return this.hasMany(Reference);
  },
  strikes: function() {
    return this.hasMany(Strike);
  },

  updateScore: function() {
    var Strike = require('./strike');
    var this_domain = this;

    console.log('blahblah');
    console.log(this_domain.id);
    console.log(this_domain.name);
    console.log(this_domain);

    Strike.countDomainStrikes(this_domain)
    .then(function(count){
      this_domain.set('score', count);
    });
    // .then(function(){ this_domain.save(); });
  },
});

module.exports = Bookshelf.model('Domain', Domain);