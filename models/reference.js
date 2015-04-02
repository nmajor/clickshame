var app = require('../app');
var bookshelf = app.get('bookshelf');

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