'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('identities', function (table) {
    table.increments();
    table.string('key').index().unique();
    table.string('type');
    table.integer('integrity').index();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('identities');
};
