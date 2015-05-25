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

  formatObj: function(originalUrl, url, hash) {
    originalUrl = stringHelper.cleanUrl(originalUrl);
    url = stringHelper.cleanUrl(url);

    var diff = !!( originalUrl !== url );
    var obj = {
      diff: diff,
      originalUrl: originalUrl
    };
    if ( hash === true ) { obj.hash = stringHelper.getCleanUrlHashFromUrl(url); }
    if ( url && url.length > 0 ) { obj.url = url; }
    return obj;
  },

  pickyLongUrl: function(url, hash) {
    var urlHelper = require('./url');
    var isShort = urlHelper.isShort(url);

    if ( isShort && hash === true ) { return urlHelper.longUrl(url, true); }
    else if ( isShort && hash !== true ) { return urlHelper.longUrl(url); }
    else if ( !isShort && hash === true ) { return Promise.resolve( urlHelper.formatObj( url, url, true ) ); }
    else { return Promise.resolve( urlHelper.formatObj( url, url, false ) ); }
  },

  pickyLongUrlToHash: function(url) {
    var urlHelper = require('./url');

    return urlHelper.pickyLongUrl(url, true);
  },

  longUrl: function(shortUrl, hash) {
    var urlHelper = require('./url');
    shortUrl = ( 'http://' + shortUrl.replace(/^.*?:\/\//, '') );
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
            if ( hash === true ) { resolve( urlHelper.formatObj( shortUrl, response.request.href, true ) ); }
            else { resolve( urlHelper.formatObj( shortUrl, response.request.href, false ) ); }
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