'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('strikes', function (table) {
    table.increments();
    table.text('url');
    table.integer('domain_id').index();
    table.integer('reference_id').index();
    table.integer('identity_id').index();
    table.dateTime('created_at').index();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('strikes');
};
