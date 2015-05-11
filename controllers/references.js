var models  = require('../models');
var appHelper = require('../helpers/app');

module.exports = {
  top: function (req, res, next) {
    appHelper.getCount(req.query.count)
    .then(models.Reference.top)
    .then(function(references) {
      res.json(references);
    }).catch(function(e) { appHelper.sendError(res, 400, e); });
  },

  find: function (req, res, next) {
    if ( !req.query.url && !req.query.urls && !req.query.hash ) { appHelper.sendError(res, 400, 'Missing required parameters.'); return; }

    models.Reference.findFromQuery(req.query)
    .then(models.Reference.filter)
    .then(function(filtered_reference) {
      res.json(filtered_reference);
    });
  }
};