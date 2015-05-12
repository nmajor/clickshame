/*jslint node: true */
"use strict";
var Promise = require("bluebird");

module.exports = function(sequelize, DataTypes) {
  var Domain = sequelize.define("Domain", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      set:  function(v) {
        var stringHelper = require('../helpers/string');
        this.setDataValue('name', stringHelper.getDomainNameFromUrl(v));
      }
    },
    name_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    scored: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    underscored: true,
    tableName: 'domains',
    classMethods: {
      associate: function(models) {
        Domain.hasMany(models.Strike, { onDelete: 'cascade', hooks: true });
        Domain.hasMany(models.Score, {
          foreignKey: 'scorable_id',
          scope: {
            scorable: 'domain'
          },
          constraints: false,
          hooks: true,
          onDelete: 'cascade'
        });
      },

      top: function(count) {
        var models = require('../models');
        return Domain.findAll({
          include: [ { model: models.Score, attributes: [ 'type', 'value' ], where: { type: 'composite' } } ],
          order: '"Scores"."value" DESC',
          limit: count,
          attributes: Domain.filterAttributes()
        });
      },

      filterAttributes: function() {
        return [ "name" ];
      },

      updateScores: function() {
        Domain.findAll({ where: { scored: false } })
        .then(function(domains) {
          domains.forEach(function(domain, index, array) {
            domain.updateScore();
          });
        });
      },

      updateScore: function(domain) {
        var models = require('../models');
        Domain.countScores(domain)
        .then(function(scores) {
          if ( scores.misleading_title > 0 ) { models.Score.findAndSetValue( 'domain', domain.id, 'misleading_title', scores.misleading_title ); }
          if ( scores.misinformation > 0 ) { models.Score.findAndSetValue( 'domain', domain.id, 'misinformation', scores.misinformation ); }
          if ( scores.emotionally_manipulative > 0 ) { models.Score.findAndSetValue( 'domain', domain.id, 'emotionally_manipulative', scores.emotionally_manipulative ); }
          models.Score.findAndSetValue( 'domain', domain.id, 'composite', scores.composite );
          domain.set('scored', true).save();
        });
      },

      countScores: function(domain) {
        var models = require('../models');
        return Promise.all([
          models.Score.countScore('domain', domain.id, 'misleading_title'),
          models.Score.countScore('domain', domain.id, 'misinformation'),
          models.Score.countScore('domain', domain.id, 'emotionally_manipulative')
        ])
        .then(function(result) {
          return Promise.resolve({ misleading_title: result[0], misinformation: result[1], emotionally_manipulative: result[2] });
        })
        .then(models.Score.calculateAndAddCompositeScore).then(function(scores) { return scores; });
      },

      findFromQuery: function(query) {
        if ( query.hasOwnProperty('hash') ) { return Domain.findByHash(query.hash); }
        else if ( query.hasOwnProperty('hashes') ) { return Domain.findByHashes(query.hashes); }
        else if ( query.hasOwnProperty('url') ) { return Domain.findByUrl(query.url); }
        else if ( query.hasOwnProperty('urls') ) { return Domain.findByUrls(query.urls); }
        else if ( query.hasOwnProperty('domain') ) { return Domain.findByDomain(query.domain); }
        else if ( query.hasOwnProperty('domains') ) { return Domain.findByDomains(query.domains); }
      },

      findByHash: function(hash) {
        return new Promise(function(resolve, reject){
          resolve( Domain.find({ where: { name_hash: hash } }) );
        });
      },

      findByHashes: function(hashes) {
        var models = require('../models');
        return Domain.findAll({
          include: [ { model: models.Score, attributes: [ 'type', 'value' ] } ],
          where: { name_hash: hashes },
          attributes: [ "name" ]
        });
      },

      findByUrl: function(url) {
        var stringHelper = require('../helpers/string');
        return Domain.find({ where: { name_hash: stringHelper.getDomainHashFromUrl(url) } });
      },

      findByUrls: function(urls) {
        var models = require('../models');
        var stringHelper = require('../helpers/string');
        var hashes = [];

        for(var i=0; i<urls.length; i++) {
          hashes[i] = stringHelper.getDomainHashFromUrl(urls[i]);
          if ( i === (urls.length-1) ) { return Domain.findByHashes(hashes); }
        }
      },

      findByDomain: function(domain) {
        var stringHelper = require('../helpers/string');
        return Domain.find({ where: { name_hash: stringHelper.getDomainHashFromDomain(domain) } });
      },

      findByDomains: function(domains) {
        var models = require('../models');
        var stringHelper = require('../helpers/string');
        var hashes = [];

        for(var i=0; i<domains.length; i++) {
          hashes[i] = stringHelper.getDomainHashFromDomain(domains[i]);
          if ( i === (domains.length-1) ) { return Domain.findByHashes(hashes); }
        }
      }
    },

    instanceMethods: {

      countScores: function() {
        this.Model.countScores(this);
      },

      updateScore: function() {
        this.Model.updateScore(this);
      },

      setNameHash: function() {
        var this_domain = this;
        var name_hash = require('crypto').createHash('md5').update(this_domain.name).digest("hex");
        return new Promise(function(resolve, reject){
          if ( !this_domain.name ) { reject('Could not set name_hash, missing url.'); }
          else { resolve(this_domain.set("name_hash", name_hash)); }
        });
      }

    },

    hooks: {
      beforeValidate: function(domain, options, callback) {
        domain.setNameHash().then(function() { callback(); }).catch(function(e) { callback(e); });
      }
    },

    getterMethods: {},
    setterMethods: {},

  });

  return Domain;
};