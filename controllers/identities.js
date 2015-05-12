var models  = require('../models');

module.exports = {

  create: function(req, res, next) {
    var source = req.body.source;
    models.Identity
    .create({source: source})
    .then(models.Identity.filter)
    .then(function(filtered_identity) {
      res.json(filtered_identity);
    })
    .catch(Promise.OperationalError, function(e) { appHelper.sendError(res, 400, e.message); })
    .catch(function(e) { appHelper.sendError(res, 400, e); });
  },

};