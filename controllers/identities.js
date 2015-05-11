var models  = require('../models');

module.exports = {

  create: function(req, res, next) {
    var source = req.body.source;
    models.Identity
    .create({source: source})
    .then(function (identity) {
      identity.filter().then(function(filtered_identity) {
        res.json(filtered_identity);
      });
    });
  },

};