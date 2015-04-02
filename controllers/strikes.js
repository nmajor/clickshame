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

};