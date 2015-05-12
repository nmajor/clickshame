/*jslint node: true */
"use strict";
var Promise = require("bluebird");

module.exports = function(sequelize, DataTypes) {
  var Request = sequelize.define("Request", {
    params: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    underscored: true,
    tableName: 'requests',

    classMethods: {
      associate: function(models) {
        Request.belongsTo(models.Identity);
      },

      logRequestFromReq: function(req, identity) {
        return identity.createRequest({
          params: Object.keys(req.query).toString(), path: req.path, method: req.method });
      }
    }
  });

  return Request;
};