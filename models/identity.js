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
        Identity.hasMany(models.Strike, { onDelete: 'cascade', hooks: true });
      },

      findByKey: function(key) {
        return Identity.find({ where: { key: key } });
      }
    },

    instanceMethods: {

      filter: function() {
        var Promise = require("bluebird");
        var this_identity = this;
        return new Promise(function(resolve){
          resolve({
            key: this_identity.key,
            source: this_identity.source
          });
        });
      },

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