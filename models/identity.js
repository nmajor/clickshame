var app = require('../app');
var bookshelf = app.get('bookshelf');

var Identity = bookshelf.Model.extend({
  tableName: 'identities',
  strikes: function(){
    return this.hasMany(Strike);
  },
});

module.exports = Identity;