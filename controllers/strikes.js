/*jslint node: true */
'use strict';

var models  = require('../models');
var appHelper = require('../helpers/app');
var Promise = require('bluebird');

module.exports = {
  recent: function(req, res, next) {
    appHelper.getCount(req.query.count)
    .then(models.Strike.recent)
    .then(function(strikes) {
      res.json(strikes);
    }).catch(function(e) { appHelper.sendError(res, 400, e); });
  },

  create: function(req, res, next) {
    if ( !req.body.url || !req.body.key || !req.body.type ) { appHelper.sendError(res, 400, 'Missing required parameters.'); return; }

    var key = req.body.key;
    var type = req.body.type;
    var comment = req.body.comment;
    var url = decodeURIComponent(req.body.url);

    var strike = models.Strike.create({
      key: key,
      url: url,
      type: type,
      comment: comment,
      updateScores: true
    })
    .then(models.Strike.filter)
    .then(function(filtered_strike) { res.json(filtered_strike); })
    .catch(Promise.OperationalError, function(e) { appHelper.sendError(res, 400, e.message); })
    .catch(function(e) { appHelper.sendError(res, 400, e); });

  },

};