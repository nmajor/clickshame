'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('domains', function (table) {
    table.increments().index();
    table.text('name').index();
    table.integer('score').index();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('domains');
};
