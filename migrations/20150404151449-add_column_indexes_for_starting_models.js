"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('identities', ['key']);
    migration.addIndex('references', ['body', 'scrore']);
    migration.addIndex('domains', ['name', 'scrore']);
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeIndex('identities', ['key']);
    migration.removeIndex('references', ['body', 'scrore']);
    migration.removeIndex('domains', ['name', 'scrore']);
    done();
  }
};
