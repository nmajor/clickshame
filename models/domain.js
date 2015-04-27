/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Domain = sequelize.define("Domain", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    score: {
      type: DataTypes.INTEGER,
    }
  }, {
    underscored: true,
    tableName: 'domains',
    classMethods: {
      associate: function(models) {
        Domain.hasMany(models.Strike);
      }
    },

    instanceMethods: {
      updateScore: function() {
        var models = require('../models');
        var this_domain = this;

        models.Strike
        .count({ where: { domain_id: this_domain.id } })
        .then( function(count) {
          this_domain.updateAttributes({ score: count });
        });
      }
    }
  });

  return Domain;
};