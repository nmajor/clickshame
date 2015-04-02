var app = require('../app');
var bookshelf = app.get('bookshelf');

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