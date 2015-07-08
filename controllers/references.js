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
    var params;
    if ( req.method === 'POST' ) { params = req.body; }
    else { params = req.query; }

    if ( !params.url && !params.urls && !params.hash && !params.hashes ) { appHelper.sendError(res, 400, 'Missing required parameters.'); return; }
    if ( !params.key ) { appHelper.sendError(res, 400, 'Missing identity key.'); return; }
    var identity;

    models.Identity.keyIsValid(params.key)
    .then(function(id) {
      identity = id;
      return models.Reference.findFromQuery(params).catch(function(e) { appHelper.sendError(res, 400, e); });
    })
    .then(function(reference) {
      res.json(reference);

      models.Request.logRequestFromReq(req, identity).catch(function(e) { appHelper.sendError(res, 400, e); });
    }).catch(function(e) { appHelper.sendError(res, 400, e); });
  },

  total: function(req, res, next) {
    models.Reference.count()
    .then(function(num){
      res.json(num);
    })
    .catch(function(e) { appHelper.sendError(res, 400, e.message); });
  }
};
