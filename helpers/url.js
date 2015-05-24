var request = require("request");
var http = require('http');
var Promise = require("bluebird");
var stringHelper = require('./string');

module.exports = {
  isShort: function(url) {
    var cleanUrl = stringHelper.cleanUrl(url);
    var urlDomain = url.replace(/\/.*$/, '');
    if (
      cleanUrl.length > 25 ||
      urlDomain.length > 10 ||
      cleanUrl.match(/.*\/.*\/.*\/.*/) ||
      cleanUrl.split('/').slice(-1).pop().length > 10
    ) { return false; }
    else { return true; }
  },

  pickyLongUrl: function(url) {
    var urlHelper = require('./url');

    if ( urlHelper.isShort(url) ) { return urlHelper.longUrl(url); }
    else { return Promise.resolve( stringHelper.cleanUrl(url) ); }
  },

  pickyLongUrlToHash: function(url) {
    var urlHelper = require('./url');

    if ( urlHelper.isShort(url) ) { return urlHelper.longUrl(url, true); }
    else { return Promise.resolve( stringHelper.getCleanUrlHashFromUrl(url) ); }
  },

  longUrl: function(shortUrl, hash) {
    return new Promise(function(resolve, reject){
      var defaultOptions = {
        method: "HEAD",
        url: shortUrl,
        followAllRedirects: true,
        timeout: 10000,
        pool: pool
      };

      var pool = new http.Agent({'maxSockets': Infinity});
      request(defaultOptions, function (error, response) {
          if (error) { reject(error); }
          else {
            if ( hash ) { resolve( stringHelper.getCleanUrlHashFromUrl(response.request.href) ); }
            else { resolve( stringHelper.cleanUrl(response.request.href) ); }
          }
      }).setMaxListeners(0);
    });
  },

  longUrls: function(urls) {
    _this = this;
    return Promise.resolve(urls).map(_this.pickyLongUrl);
  },

  longUrlsToHashes: function(urls) {
    _this = this;
    return Promise.resolve(urls).map(_this.pickyLongUrlToHash);
  }
};