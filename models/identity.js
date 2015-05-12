/*jslint node: true */
"use strict";
var Promise = require('bluebird');

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
      validate: {
        isIn: [['chrome']]
      }
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
      },

      allowedSources: function() { return ["chrome"]; },

      filter: function(identity) {
        return new Promise(function(resolve){
          resolve({
            key: identity.key,
            source: identity.source
          });
        });
      }
    },

    instanceMethods: {

      filter: function() { return this.Model.filter(this); },

      generateAndSetKey: function() {
        var stringHelper = require('../helpers/string');
        var this_identity = this;
        return new Promise(function(resolve){
          if ( !this_identity.key ) { resolve( this_identity.set("key", stringHelper.randomString(50)) ); }
        });
      }

    },

    hooks: {
      beforeValidate: function(identity) {
        identity.generateAndSetKey();
      }

    }
  });

  return Identity;
};