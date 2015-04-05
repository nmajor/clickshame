var models  = require('../models');
var referenceHelper = require('../helpers/reference');

module.exports = {
  index: function (req, res, next) {
    if (req.query.urls || req.query.url) {
      referenceHelper.searchReferences(req, res, next);
    } else {
      referenceHelper.topReferences(req, res, next);
    }
  },

};