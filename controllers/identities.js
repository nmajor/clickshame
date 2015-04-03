var Identity = require('../models/identity');
var Identities = require('../collections/identities');

module.exports = {

  create: function(req, res, next) {
    var type = req.body.type;
    new Identity({type: type})
    .save()
    .then(function (model) {
      res.json(model.toJSON());
    })
    .otherwise(function (error) {
      res.status(500).json({msg: error.message});
    });
  },

};