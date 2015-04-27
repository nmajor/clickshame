/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Reference = sequelize.define("Reference", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    score: {
      type: DataTypes.INTEGER,
    }
  }, {
    underscored: true,
    tableName: 'references',
    classMethods: {
      associate: function(models) {
        Reference.hasMany(models.Strike);
      }
    },

    instanceMethods: {
      updateScore: function() {
        var models = require('../models');
        var this_reference = this;

        models.Strike
        .count({ where: { reference_id: this_reference.id } })
        .then( function(count) {
          this_reference.updateAttributes({ score: count });
        });
      }
    },
  });

  return Reference;
};