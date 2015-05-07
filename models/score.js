/*jslint node: true */
"use strict";

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