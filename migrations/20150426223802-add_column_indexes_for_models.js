"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('strikes', ['url']);
    migration.addIndex('identities', ['key']);
    migration.addIndex('references', ['url']);
    migration.addIndex('domains', ['name']);
    migration.addIndex('scores', ['type', 'scorable_id', 'scorable']);
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeIndex('strikes', ['url']);
    migration.removeIndex('identities', ['key']);
    migration.removeIndex('references', ['url']);
    migration.removeIndex('domains', ['name']);
    migration.removeIndex('scores', ['type', 'scorable_id', 'scorable']);
    done();
  }
};
