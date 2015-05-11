var models  = require('../models');
var domainHelper = require('../helpers/domain');

module.exports = {
  index: function (req, res, next) {
    if (req.query.urls || req.query.url) {
      domainHelper.searchDomainsByUrl(req, res, next);
    } else if (req.query.domains || req.query.domain) {
      domainHelper.searchDomainsByDomain(req, res, next);
    } else {
      domainHelper.topDomains(req, res, next);
    }
  },

  // index: function (req, res, next) {
  //   var max = 100;
  //   var def = 10;
  //   var count = req.query.count;

  //   if (!count) {
  //     count = def;
  //   } else if (count > max) {
  //     count = max;
  //   }

  //   models.Domain.findAll({
  //     order: [['score', 'DESC']],
  //     limit: count,
  //   })
  //   .then(function(models) {
  //     res.json(models);
  //   });
  // },

};