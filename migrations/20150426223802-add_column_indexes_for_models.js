"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('strikes', ['url']);
    migration.addIndex('identities', ['key']);
    migration.addIndex('references', ['url', 'score']);
    migration.addIndex('domains', ['name', 'score']);
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeIndex('strikes', ['url']);
    migration.removeIndex('identities', ['key']);
    migration.removeIndex('references', ['url', 'score']);
    migration.removeIndex('domains', ['name', 'score']);
    done();
  }
};
