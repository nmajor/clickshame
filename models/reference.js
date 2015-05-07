/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Reference = sequelize.define("Reference", {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    }
  }, {
    underscored: true,
    tableName: 'references',
    classMethods: {
      associate: function(models) {
        Reference.hasMany(models.Strike);
        Reference.hasMany(models.Score, {
          foreignKey: 'scorable_id',
          scope: {
            scorable: 'reference'
          },
          constraints: false,
        });
      }
    },

    instanceMethods: {
      updateTypeScore: function(type) {
        var Promise = require("bluebird");
        var models = require('../models');
        var this_reference = this;

        return new Promise(function(resolve){

          models.Strike
          .count({ where: { reference_id: this_reference.id, type: type } })
          .then( function(count) {
            this_reference.getScores({ where: { type: type } })
            .then(function(score) {
              if ( score.length > 0 ) {
                score[0].updateAttributes({ value: count });
              } else {
                this_reference.createScore({ type: type, value: count });
              }
              resolve(this_reference);
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
        var this_reference = this;
        var Promise = require("bluebird");

        this_reference.getScores()
        .then(function(scores) {
          return this_reference.calculateCompositeScore(scores);
        }).then(function(compositeScore) {
          return new Promise(function(){
            this_reference.getScores({ where: { type: 'composite' } })
            .then(function(score) {
              if ( score.length > 0 ) {
                score[0].updateAttributes({ value: compositeScore });
              } else {
                this_reference.createScore({ type: 'composite', value: compositeScore });
              }
            });
          });
        });
      }

    },
  });

  return Reference;
};