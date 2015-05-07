/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Domain = sequelize.define("Domain", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    }
  }, {
    underscored: true,
    tableName: 'domains',
    classMethods: {
      associate: function(models) {
        Domain.hasMany(models.Strike);
        Domain.hasMany(models.Score, {
          foreignKey: 'scorable_id',
          scope: {
            scorable: 'domain'
          },
          constraints: false,
        });
      }
    },

    instanceMethods: {
      updateTypeScore: function(type) {
        var Promise = require("bluebird");
        var this_domain = this;
        var models = require('../models');

        return new Promise(function(resolve){

          models.Strike
          .count({ where: { domain_id: this_domain.id, type: type } })
          .then( function(count) {
            this_domain.getScores({ where: { type: type } })
            .then(function(score) {
              if ( score.length > 0 ) {
                score[0].updateAttributes({ value: count });
              } else {
                this_domain.createScore({ type: type, value: count });
              }
              resolve(this_domain);
            });
          });
        });
      },

      calculateCompositeScore: function(scores) {
        var Promise = require("bluebird");

        return new Promise(function(resolve){
          var compositeScore = 0;
          for ( var i=0; i<scores.length; i++ ) {
            switch(scores[i].type) {
            case 'misleading_title':
              compositeScore += scores[i].value;
              break;
            case 'misinformation':
              compositeScore += scores[i].value;
              break;
            case 'emotionally_manipulative':
              compositeScore += scores[i].value;
              break;
            }
          }
          resolve(compositeScore);
        });
      },

      updateCompositeScore: function() {
        var models = require('../models');
        var this_domain = this;
        var Promise = require("bluebird");

        this_domain.getScores()
        .then(function(scores) {
          return this_domain.calculateCompositeScore(scores);
        }).then(function(compositeScore) {
          return new Promise(function(){
            this_domain.getScores({ where: { type: 'composite' } })
            .then(function(score) {
              if ( score.length > 0 ) {
                score[0].updateAttributes({ value: compositeScore });
              } else {
                this_domain.createScore({ type: 'composite', value: compositeScore });
              }
            });
          });
        });
      }

    }
  });

  return Domain;
};