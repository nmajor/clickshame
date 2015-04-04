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
    var key = req.body.key;
    var url = req.body.url;
    new Strike({"key": key, "url": url})
    .save()
    .then(function (model) {
      model.save()
      res.json(model.toJSON());
    })
    .otherwise(function (error) {
      res.status(500).json({msg: error.message});
    });
  },

};