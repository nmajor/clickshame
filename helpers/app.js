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
    console.log('ERROR: '+require('util').inspect(message));

    if ( typeof(message) === 'object' ) { message = message.message; }

    res.status(code); res.json({ error: message.replace(/^Validation error:\s/, '') });
  }
};