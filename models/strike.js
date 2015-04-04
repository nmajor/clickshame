var config = require('../config/config');
var Bookshelf = require('../config/dbconnect')(config);
Bookshelf.plugin('registry');
var stringHelper = require('../helpers/string');
var Promise  = require('bluebird');

var Identity = require('./identity');
var Domain = require('./domain');
var Reference = require('./reference');

// require('./identity');
// require('./domain');
// require('./reference');

var Strike = Bookshelf.Model.extend({
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
    this.on('creating', this.setIdentity());
    this.on('creating', this.setDomain());
    this.on('creating', this.setReference());

    this.on('saved', function(){
      if (this.domain()) {
        console.log(this.related('domain'));
        this.related('domain').updateScore();
      }
    });
    // this.on('saved', function(){ if (this.reference()) this.reference().updateScore(); });
  },

  setIdentity: function() {
    // var Identity = require('./identity');
    var this_strike = this;
    var identity_key = this_strike.attributes.key;
    delete this_strike.attributes.key;

    new Identity({key: identity_key})
    .fetch()
    .then(function(model) {
      if (!model) throw new Error('Could not find an identity from this key');
      this_strike.set('identity_id', model.id);
    });
  },

  setDomain: function() {
    // var Domain = require('./domain');
    var this_strike = this;
    var url = this_strike.get('url');
    var domain_name = stringHelper.getDomainNameFromUrl(url);

    new Domain({name: domain_name})
    .fetch()
    .then(function(model) {
      if (model) {
        this_strike.set('domain_id', model.id);
      } else {
        new Domain({name: domain_name})
        .save()
        .then(function(model) {
          this_strike.set('domain_id', model.id);
        });
      }
    });
  },

  setReference: function() {
    // var Reference = require('./reference');
    var this_strike = this;
    var url = this_strike.get('url');
    var reference_body = stringHelper.getReferenceFromUrl(url);

    new Reference({body: reference_body})
    .fetch()
    .then(function(model) {
      if (model) {
        this_strike.set('reference_id', model.id);
      } else {
        new Reference({body: reference_body})
        .save()
        .then(function(model) {
          this_strike.set('reference_id', model.id);
        });
      }
    });
  },
},
{
  countDomainStrikes: function(domain) {
    return Bookshelf.knex('strikes')
    .count()
    .where({ domain_id: domain.id })
    .then(function(result) { return result[0].count; });
  },
  countReferenceStrikes: function(reference) {
    return Bookshelf.knex('strikes')
    .count()
    .where({ reference_id: reference.id })
    .then(function(result) { return result[0].count; });
  }
});

module.exports = Bookshelf.model('Strike', Strike);