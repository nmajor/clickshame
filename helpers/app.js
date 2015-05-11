var models  = require('../models');
var Promise = require('bluebird');

module.exports = {
  getCount: function(count) {
    return new Promise(function(resolve){
      var max = 100;
      var def = 10;

      if (!count) { resolve(def); }
      else if (count > max) { resolve(max); }
      else { resolve(count); }
    });
  },
  sendError: function(res, code, message) {
    res.status(code); res.json({ error: message });
  }
};