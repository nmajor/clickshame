var models  = require('../models');
var appHelper = require('../helpers/app');

module.exports = {
  top: function (req, res, next) {
    if ( !req.query.key ) { appHelper.sendError(res, 400, 'Missing identity key.'); return; }
    var identity;
    console.log('heyblah1');

    models.Identity.keyIsValid(req.query.key)
    .then(function(id) {
      identity = id;
      return appHelper.getCount(req.query.count);
    })
    .then(models.Domain.top)
    .then(function(domains) {
      res.json(domains);

      models.Request.logRequestFromReq(req, identity);
    }).catch(function(e) { appHelper.sendError(res, 400, e); });
  },

  find: function (req, res, next) {
    if ( !req.query.url && !req.query.urls && !req.query.hash && !req.query.hashes && !req.query.domain && !req.query.domains ) { appHelper.sendError(res, 400, 'Missing required parameters.'); return; }
    if ( !req.query.key ) { appHelper.sendError(res, 400, 'Missing identity key.'); return; }
    var identity;

    models.Identity.keyIsValid(req.query.key)
    .then(function(id) {
      identity = id;
      return models.Domain.findFromQuery(req.query);
    })
    .then(models.Domain.filter)
    .then(function(filtered_domain) {
      res.json(filtered_domain);

      models.Request.logRequestFromReq(req, identity);
    });
  }
};