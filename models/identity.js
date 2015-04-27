/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Identity = sequelize.define("Identity", {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    integrity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    underscored: true,
    tableName: 'identities',

    classMethods: {
      associate: function(models) {
        Identity.hasMany(models.Strike);
      }
    },

    instanceMethods: {
      generateAndSetKey: function() {
        var stringHelper = require('../helpers/string');
        if (!this.key) this.key = stringHelper.randomString(100);
      },
    },

    hooks: {
      beforeValidate: function(identity) {
        identity.generateAndSetKey();
      },
    }
  });

  return Identity;
};