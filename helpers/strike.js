var models  = require('../models');

module.exports = {
  strikeCount: function(req) {
    var max = 100;
    var def = 10;
    var count = req.query.count;

    if (!count) {
      count = def;
    } else if (count > max) {
      count = max;
    }

    return count;
  },

  recentStrikes: function(req, res, next) {
    var count = this.strikeCount(req);
    models.Strike.findAll({
      order: [['created_at', 'DESC']],
      limit: count,
      attributes: [ "link", "created_at" ]
    })
    .then(function(models) {
      res.json(models);
    });
  },

  findStrike: function(req, res, next) {
    var link = decodeURIComponent(req.body.link);
    var key = req.body.key;

    var strike = models.Strike.build({
      key: key,
      link: link,
    });

    strike.findAndSetAssociations()
    .then(function(strike){
      strike.likeMe().then(function(existing_strike) {
        res.json(existing_strike);
      });
    });
  }
};