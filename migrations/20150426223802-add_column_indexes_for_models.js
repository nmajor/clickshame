"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('identities', ['key']);
    migration.addIndex('references', ['url_hash', 'scored']);
    migration.addIndex('domains', ['name_hash', 'scored']);
    migration.addIndex('scores', ['type', 'scorable_id', 'scorable']);
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeIndex('identities', ['key']);
    migration.removeIndex('references', ['url_hash', 'scored']);
    migration.removeIndex('domains', ['name_hash', 'scored']);
    migration.removeIndex('scores', ['type', 'scorable_id', 'scorable']);
    done();
  }
};
