var models  = require('../models');

module.exports = {
  // strikeCount: function(req) {
  //   var max = 100;
  //   var def = 10;
  //   var count = req.query.count;

  //   if (!count) {
  //     count = def;
  //   } else if (count > max) {
  //     count = max;
  //   }

  //   return count;
  // },

  recentStrikes: function(req, res, next) {
    var count = this.strikeCount(req);
    models.Strike.findAll({
      order: [['created_at', 'DESC']],
      limit: count,
      attributes: [ "url", "created_at" ]
    })
    .then(function(models) {
      res.json(models);
    });
  },

  // findStrike: function(req, res, next) {
  //   var url = decodeURIComponent(req.query.url);
  //   var key = req.query.key;

  //   var strike = models.Strike.build({
  //     key: key,
  //     url: url,
  //   });

  //   strike.likeMe().then(function(existing_strike) {
  //     if ( existing_strike ) { res.json(existing_strike); } else { res.json({}); }
  //   });
  // }
};