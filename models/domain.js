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

      findByUrl: function(url) {
        var stringHelper = require('../helpers/string');
        var name = stringHelper.getDomainNameFromUrl(url);
        return Domain.find({ where: { name: name } });
      }
    },

    instanceMethods: {

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
      beforeValidate: function(reference, options, callback) {
        reference.setNameHash().then(function() { callback(); }).catch(function(e) { callback(e); });
      }
    },

    getterMethods: {},
    setterMethods: {},

  });

  return Domain;
};