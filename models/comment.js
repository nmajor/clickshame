/*jslint node: true */
"use strict";

module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    strike_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    underscored: true,
    tableName: 'comments',

    classMethods: {
      associate: function(models) {
        Comment.belongsTo(models.Strike);
      }
    },

    instanceMethods: {},

    hooks: {}
  });

  return Comment;
};