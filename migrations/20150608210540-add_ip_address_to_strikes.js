"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
      'strikes',
      'ip',
      DataTypes.STRING
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('strikes', 'ip');
    done();
  }
};
