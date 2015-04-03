var config = require('../config/config');
var bookshelf = require('../config/dbconnect')(config);
var Identity = require('./identity');

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
  },
  initialize: function() {
    this.on('creating', this.setIdentity);
    // this.on('creating', this.setDomain);
    // this.on('creating', this.setReference);
  },
  setIdentity: function() {
    new Identity({key: this.key})
    .fetch()
    .then(function(model){
      this.set(identity_id, model.id);
    });
  }
});

module.exports = Strike;