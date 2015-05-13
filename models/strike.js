/*jslint node: true */
"use strict";
var Promise = require("bluebird");

module.exports = function(sequelize, DataTypes) {
  var Strike = sequelize.define("Strike", {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [ ['misleading_title', 'misinformation', 'emotionally_manipulative'] ]
      }
    }
  }, {
    underscored: true,
    tableName: 'strikes',
    timestamps: true,
    updatedAt: false,

    classMethods: {
      associate: function(models) {
        Strike.belongsTo(models.Identity);
        Strike.belongsTo(models.Reference);
        Strike.belongsTo(models.Domain);
      },

      recent: function(count) {
        return Strike.findAll({
          order: [['created_at', 'DESC']],
          limit: count,
          attributes: [ "url", "created_at" ]
        });
      },

      findByKeyAndUrl: function(key, url) {
        var models = require('../models');
        return models.Identity.find({ where: { key: key } })
        .then(function(identity) {
          return new Promise(function(resolve, reject){
            if ( !identity ) { reject('Invalid identity key.'); }
            else {
              Strike.find({ where: { url: url, identity_id: identity.id } })
              .then( function(strike) { resolve(strike); });
            }
          });
        });
      },

      filter: function(strike) {
        if ( !strike ) { return new Promise(function(resolve){ resolve(''); }); }
        return new Promise(function(resolve){
          resolve({
            type: strike.type,
            url: strike.url,
            created_at: strike.created_at,
          });
        });
      }
    },

    instanceMethods: {

      filter: function() { return this.Model.filter(this); },

      likeMe: function() {
        var this_strike = this;
        return new Promise(function(resolve){
          this_strike.getIdentity()
          .then(function(identity) {
            this_strike.Model.findByKeyAndUrl( identity.key, this_strike.url )
            .then(resolve);
          });
        });
      },

      createComment: function() {
        var this_strike = this;
        var models = require('../models');
        if ( this_strike._comment.length > 0 ) {
          return this_strike.getReference()
          .then(function(reference) { reference.createComment({ text: this_strike._comment }); });
        } else { return Promise.resolve(); }
      },

      setIdentityFromKey: function() {
        var this_strike = this;
        var models = require('../models');
        return new Promise(function(resolve, reject){
          if ( !this_strike.key ) { reject('Invalid identity key.'); }
          models.Identity.findByKey(this_strike.key)
          .then(function(identity) {
            if ( !identity ) { reject('Invalid identity key.'); }
            else { this_strike.set("identity_id", identity.id); resolve(this_strike); }
          });
        });
      },

      setReferenceFromUrl: function() {
        var this_strike = this;
        var models = require('../models');
        var stringHelper = require('../helpers/string');

        return new Promise(function(resolve, reject){
          if ( !this_strike.url ) { reject('Could not set reference, missing url.'); }
          models.Reference.find({ where: { url_hash: stringHelper.getCleanUrlHashFromUrl(this_strike.url) } })
          .then(function(reference) {
            if ( !reference ) {
              models.Reference.create({url: this_strike.url})
              .then(function(new_reference) { resolve(this_strike.set("reference_id", new_reference.id)); });
            } else {
              if ( reference.scored ) { reference.set("scored", false).save(); }
              resolve(this_strike.set("reference_id", reference.id));
            }
          });
        });
      },

      setDomainFromUrl: function() {
        var this_strike = this;
        var models = require('../models');
        var stringHelper = require('../helpers/string');

        return new Promise(function(resolve, reject){
          if ( !this_strike.url ) { reject('Could not set domain, missing url.'); }
          models.Domain.find({ where: { name_hash: stringHelper.getDomainHashFromUrl(this_strike.url) } })
          .then(function(domain) {
            if ( !domain ) {
              models.Domain.create({name: this_strike.url})
              .then(function(new_domain) { resolve(this_strike.set("domain_id", new_domain.id)); });
            } else {
              if ( domain.scored ) { domain.set("scored", false).save(); }
              resolve(this_strike.set("domain_id", domain.id));
            }
          });
        });
      },

      isUnique: function() {
        var this_strike = this;
        return this.likeMe().then(function(strike) {
          if ( strike ) { return Promise.reject('You have already submitted this url.'); } else { return Promise.resolve(); }
        });
      }
    },

    hooks: {
      beforeValidate: function(strike, options, callback) {
        if ( !strike.identity_id ) {
          Promise.all([
            strike.setIdentityFromKey()
          ]).then(function() { callback(); }).catch(function(e) { callback(e); });
        } else { callback(); }
      },

      afterValidate: function(strike, options, callback) {
        strike.isUnique().then(function() { callback(); }).catch(function(e) { callback(e); });
      },

      beforeCreate: function(strike, options, callback) {
        Promise.all([
          strike.setReferenceFromUrl(),
          strike.setDomainFromUrl()
        ]).then(function() { callback(); }).catch(function(e) { callback(e); });
      },

      afterCreate: function(strike, options, callback) {
        strike.createComment( { text: strike._comment } ).then(function() { callback(); }).catch(function(e) { callback(e); });

        var models = require('../models');
        if ( strike._updateScores ) {
          strike.getReference().then(models.Reference.updateScore)
          .then(function() { strike.getDomain().then(models.Domain.updateScore); })
          .catch(function(e) { console.log('blahfuck '+require('util').inspect(e)); });
        }
      }
    },

    getterMethods: {
      key: function() { return this._key; },
      comment: function(v) { return this._comment; },
      updateScores: function(v) { return this._updateScores; }
    },

    setterMethods: {
      key: function(v) { this._key = v; },
      comment: function(v) { this._comment = v; },
      updateScores: function(v) { this._updateScores = v; },
    },

  });

  return Strike;
};