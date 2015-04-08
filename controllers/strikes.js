var models  = require('../models');
var strikeHelper = require('../helpers/strike');

module.exports = {
  index: function (req, res, next) {
    var count = strikeHelper.strikeCount(req);
    models.Strike.findAll({
      order: [['created_at', 'DESC']],
      limit: count,
      attributes: [ "link" ]
    })
    .then(function(models) {
      res.json(models);
    });
  },

  create: function(req, res, next) {
    var key = req.body.key;
    var violation = req.body.violation;
    var comment = req.body.comment;
    var link = decodeURIComponent(req.body.link);
    console.log('blah1');
    console.log({
      key: key,
      link: link,
      violation: violation,
      comment: comment,
    });

    var strike = models.Strike.build({
      key: key,
      link: link,
      violation: violation,
      comment: comment,
    });

    strike.findAndSetAssociations()
    .then(function(strike) { return strike.save(); })
    .then(function(model) {
      res.json(model);
    });
  },

};