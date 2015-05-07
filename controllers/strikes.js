/*jslint node: true */
'use strict';

var models  = require('../models');
var strikeHelper = require('../helpers/strike');

module.exports = {
  index: function(req, res, next) {
    if ( req.query ) {
      strikeHelper.findStrike(req, res, next);
    } else {
      strikeHelper.recentStrikes(req, res, next);
    }
  },

  create: function(req, res, next) {
    var key = req.body.key;
    var type = req.body.type;
    var comment = req.body.comment;
    var url = decodeURIComponent(req.body.url);

    var strike = models.Strike.build({
      key: key,
      url: url,
      type: type,
      comment: comment,
    });

    strike.findAndSetAssociations()
    .then(function(strike) { return strike.save(); })
    .then(function(model) {
      res.json(model);
    });
  },

};