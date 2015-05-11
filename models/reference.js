/*jslint node: true */
"use strict";
var Promise = require("bluebird");

module.exports = function(sequelize, DataTypes) {
  var Reference = sequelize.define("Reference", {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      set:  function(v) {
        var stringHelper = require('../helpers/string');
        this.setDataValue('url', stringHelper.cleanUrl(v));
      }
    },
    url_hash: {
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
    tableName: 'references',
    classMethods: {
      associate: function(models) {
        Reference.hasMany(models.Strike, { onDelete: 'cascade', hooks: true });
        Reference.hasMany(models.Score, {
          foreignKey: 'scorable_id',
          scope: {
            scorable: 'reference'
          },
          constraints: false,
          hooks: true,
          onDelete: 'cascade'
        });
      },

      top: function(count) {
        var models = require('../models');
        return Reference.findAll({
          include: [ { model: models.Score, attributes: [ 'type', 'value' ], where: { type: 'composite' } } ],
          order: '"Scores"."value" DESC',
          limit: count,
          attributes: Reference.filterAttributes()
        });
      },

      filterAttributes: function() {
        return [ "url" ];
      },

      updateScores: function() {
        Reference.findAll({ where: { scored: false } })
        .then(function(references) {
          references.forEach(function(reference, index, array) {
            reference.updateScore();
          });
        });
      },

      updateScore: function(reference) {
        var models = require('../models');
        Reference.countScores(reference)
        .then(function(scores) {
          if ( scores.misleading_title > 0 ) { models.Score.findAndSetValue( 'reference', reference.id, 'misleading_title', scores.misleading_title ); }
          if ( scores.misinformation > 0 ) { models.Score.findAndSetValue( 'reference', reference.id, 'misinformation', scores.misinformation ); }
          if ( scores.emotionally_manipulative > 0 ) { models.Score.findAndSetValue( 'reference', reference.id, 'emotionally_manipulative', scores.emotionally_manipulative ); }
          models.Score.findAndSetValue( 'reference', reference.id, 'composite', scores.composite );
          reference.set('scored', true).save();
        });
      },

      countScores: function(reference) {
        var models = require('../models');
        return Promise.all([
          models.Score.countScore('reference', reference.id, 'misleading_title'),
          models.Score.countScore('reference', reference.id, 'misinformation'),
          models.Score.countScore('reference', reference.id, 'emotionally_manipulative')
        ])
        .then(function(result) {
          return Promise.resolve({ misleading_title: result[0], misinformation: result[1], emotionally_manipulative: result[2] });
        })
        .then(models.Score.calculateAndAddCompositeScore).then(function(scores) { return scores; });
      },

      findFromQuery: function(query) {
        if ( query.hasOwnProperty('hash') ) {  }
        else if ( query.hasOwnProperty('url') ) {  }
        else if ( query.hasOwnProperty('urls') ) {  }
      },

      findByUrl: function(url) {
        var stringHelper = require('../helpers/string');
        return Reference.find({ where: { url_hash: stringHelper.getCleanUrlHashFromUrl(url) } });
      },

      findByHash: function(hash) {
        return new Promise(function(resolve, reject){
          resolve( Reference.find({ where: { url_hash: hash } }) );
        });
      },

      findByUrls: function(urls) {
        var stringHelper = require('../helpers/string');
        var 

        for(var i=0; i<urls.length; i++) {
          urls[i] = stringHelper.getCleanUrlHashFromUrl(urls[i]);
        }
        Reference.findAll({
          include: [ { model: models.Score, attributes: [ 'type', 'value' ] } ],
          where: { url: urls },
          attributes: [ "url" ]
        });
      }
    },

    instanceMethods: {

      setUrlHash: function() {
        var this_reference = this;
        var url_hash = require('crypto').createHash('md5').update(this_reference.url).digest("hex");
        return new Promise(function(resolve, reject){
          if ( !this_reference.url ) { reject('Could not set url_hash, missing url.'); }
          else { resolve(this_reference.set("url_hash", url_hash)); }
        });
      },

      countScores: function() {
        this.Model.countScores(this);
      },

      updateScore: function() {
        this.Model.updateScore(this);
      }

    },

    hooks: {
      beforeValidate: function(reference, options, callback) {
        reference.setUrlHash().then(function() { callback(); }).catch(function(e) { callback(e); });
      }
    },

  });

  return Reference;
};