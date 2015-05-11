"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('identities', ['key']);
    migration.addIndex('references', ['url_hash']);
    migration.addIndex('domains', ['name_hash']);
    migration.addIndex('scores', ['type', 'scorable_id', 'scorable']);
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeIndex('identities', ['key']);
    migration.removeIndex('references', ['url_hash']);
    migration.removeIndex('domains', ['name_hash']);
    migration.removeIndex('scores', ['type', 'scorable_id', 'scorable']);
    done();
  }
};
