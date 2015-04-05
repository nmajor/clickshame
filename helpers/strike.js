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
}