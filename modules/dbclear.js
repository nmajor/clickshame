var models = require('../models');

module.exports.run = function() {
  return models.Identity.destroy( { where: true } )
  .then(function() { models.Domain.destroy( { where: true } ); })
  .then(function() { models.Reference.destroy( { where: true } ); })
  .then(function() { models.Strike.destroy( { where: true } ); })
  .then(function() { models.Score.destroy( { where: true } ); })
  .then(function() { models.Comment.destroy( { where: true } ); });
};