/*jslint node: true */
'use strict';

var models  = require('../models');
var strikeHelper = require('../helpers/strike');

module.exports = {
  index: function(req, res, next) {
    if ( req.query ) {
      console.log('heyman1');
      strikeHelper.findStrike(req, res, next);
    } else {
      console.log('heyman2');
      strikeHelper.recentStrikes(req, res, next);
    }
  },

  create: function(req, res, next) {
    var key = req.body.key;
    var violation = req.body.violation;
    var comment = req.body.comment;
    var link = decodeURIComponent(req.body.link);

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