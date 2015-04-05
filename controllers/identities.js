var models  = require('../models');

module.exports = {

  create: function(req, res, next) {
    var source = req.body.source;
    models.Identity
    .create({source: source})
    .then(function (model) {
      res.json(model.toJSON());
    });
  },

};