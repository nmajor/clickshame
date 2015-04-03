var Strike = require('../models/strike');
var Strikes = require('../collections/strikes');

module.exports = {
  index: function(req, res, next) {
    var count = req.params.count;
    Strikes.forge()
    .fetch()
    .then(function (collection) {
      res.json(collection.toJSON());
    })
    .otherwise(function (error) {
      res.status(500).json({msg: error.message});
    });
  },

  create: function(req, res, next) {
    key = req.body.key;
    new Strike({"key": key})
    .save()
    .then(function (model) {
      res.json(model.toJSON());
    })
    .otherwise(function (error) {
      res.status(500).json({msg: error.message});
    });
  },

};