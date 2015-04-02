// var app = require('../app');

var express = require('express');
var router = express.Router();
console.log(router);
console.log(router.app);

var bookshelf = app.get('bookshelf');

var Strike = bookshelf.Model.extend({
  tableName: 'strikes',
  domain: function() {
    return this.belongsTo(Domain);
  },
  reference: function() {
    return this.belongsTo(Reference);
  },
  identity: function() {
    return this.belongsTo(Identity);
  }
});

module.exports = Strike;