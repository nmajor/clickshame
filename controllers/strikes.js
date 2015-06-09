/*jslint node: true */
'use strict';

var models  = require('../models');
var appHelper = require('../helpers/app');
var Promise = require('bluebird');

module.exports = {
  recent: function(req, res, next) {
    if ( !req.query.key ) { appHelper.sendError(res, 400, 'Missing identity key.'); return; }
    var identity;

    models.Identity.keyIsValid(req.query.key)
    .then(function(id) {
      identity = id;
      return appHelper.getCount(req.query.count);
    })
    .then(models.Strike.recent)
    .then(function(strikes) {
      res.json(strikes);

      models.Request.logRequestFromReq(req, identity);
    }).catch(function(e) { appHelper.sendError(res, 400, e); });
  },

  create: function(req, res, next) {
    if ( !req.body.url || !req.body.key || !req.body.type ) { appHelper.sendError(res, 400, 'Missing required parameters.'); return; }
    var identity;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    models.Identity.keyIsValid(req.body.key)
    .then(function(id) {
      identity = id;

      return models.Strike.create({
        identity_id: identity.id,
        key: req.body.key,
        url: decodeURIComponent(req.body.url),
        type: req.body.type,
        comment: req.body.comment,
        recaptchaResponse: req.body.recaptcha_response,
        ip: ip,
        updateScores: true
      });
    })
    .then(models.Strike.filter)
    .then(function(filtered_strike) {
      res.json(filtered_strike);

      models.Request.logRequestFromReq(req, identity);
    })
    .catch(Promise.OperationalError, function(e) { appHelper.sendError(res, 400, e.message); })
    .catch(function(e) { appHelper.sendError(res, 400, e); });

  },

};