'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('references', function (table) {
    table.increments().index();
    table.text('body').index();
    table.integer('score').index();
    table.integer('domain_id').index();
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('references');
};
