/*jslint node: true */
"use strict";
var Promise = require("bluebird");

module.exports = function(sequelize, DataTypes) {
  var Score = sequelize.define("Score", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'scorableIndex',
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scorable: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'scorableIndex',
    },
    scorable_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'scorableIndex',
    },
  }, {
    underscored: true,
    tableName: 'scores',

    classMethods: {
      allowedTypes: function() { return ['composite', 'misleading_title', 'misinformation', 'emotionally_manipulative']; },
      associate: function(models) {
        Score.belongsTo(models.Reference, { foreignKey: 'scorable_id', as: 'Reference', constraints: false });
        Score.belongsTo(models.Domain, { foreignKey: 'scorable_id', as: 'Domain', constraints: false });
      },

      countScore: function(scorable, scorableId, type) {
        var models = require('../models');
        var scorableCol = scorable+'_id';
        var wheres = { type: type };
        wheres[scorableCol] = scorableId;

        return models.Strike.count({ where: wheres });
      },

      findAndSetValue: function(scorable, scorable_id, type, value) {
        Score.findOrCreate({
          where: {
            scorable: scorable,
            scorable_id: scorable_id,
            type: type
          }, defaults: { value: 0 } }).spread(function(score, created) { score.set('value', value).save(); });
      },

      calculateAndAddCompositeScore: function(scores) {
        return new Promise(function(resolve, reject){
          scores.composite = scores.misleading_title + scores.misinformation + scores.emotionally_manipulative;
          resolve(scores);
        });
      }
    },

    instanceMethods: {
      generateAndSetKey: function() {
        var stringHelper = require('../helpers/string');
        if (!this.key) this.key = stringHelper.randomString(100);
      },
    },

    hooks: {}
  });

  return Score;
};