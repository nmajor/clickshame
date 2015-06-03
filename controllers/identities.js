var models  = require('../models');
var appHelper = require('../helpers/app');

module.exports = {

  create: function(req, res, next) {
    var source = req.body.source;
    models.Identity
    .create({source: source})
    .then(models.Identity.filter)
    .then(function(filtered_identity) {
      res.json(filtered_identity);
    })
    .catch(function(e) { appHelper.sendError(res, 400, e.message); });
  },

  total: function(req, res, next) {
    models.Identity.count()
    .then(function(num){
      res.json(num);
    })
    .catch(function(e) { appHelper.sendError(res, 400, e.message); });
  }

};