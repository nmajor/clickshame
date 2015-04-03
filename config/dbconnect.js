module.exports = function(config){
  var knex = require('knex')(config.db);
  return require('bookshelf')(knex);
};