var models  = require('../models');
var appHelper = require('../helpers/app');

module.exports = {
  top: function (req, res, next) {
    if ( !req.query.key ) { appHelper.sendError(res, 400, 'Missing identity key.'); return; }
    var identity;

    models.Identity.keyIsValid(req.query.key)
    .then(function(id) {
      identity = id;
      return appHelper.getCount(req.query.count);
    })
    .then(models.Reference.top)
    .then(function(references) {
      res.json(references);

      models.Request.logRequestFromReq(req, identity);
    }).catch(function(e) { appHelper.sendError(res, 400, e); });
  },

  find: function (req, res, next) {
    if ( !req.query.url && !req.query.urls && !req.query.hash && !req.query.hashes ) { appHelper.sendError(res, 400, 'Missing required parameters.'); return; }
    if ( !req.query.key ) { appHelper.sendError(res, 400, 'Missing identity key.'); return; }
    var identity;

    models.Identity.keyIsValid(req.query.key)
    .then(function(id) {
      identity = id;
      return models.Reference.findFromQuery(req.query);
    })
    .then(models.Reference.filter)
    .then(function(filtered_reference) {
      res.json(filtered_reference);

      models.Request.logRequestFromReq(req, identity);
    });
  }
};