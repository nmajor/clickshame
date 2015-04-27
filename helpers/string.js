module.exports = {
  randomString: function(length) {
    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  },
  getDomainNameFromUrl: function(url_string) {
    var url = require('url');
    url_string = decodeURIComponent(url_string);
    return (url.parse(url_string).hostname).replace(/^www\./, '');
  },
  getReferenceBodyFromUrl: function(url_string) {
    url_string = decodeURIComponent(url_string);
    return url_string.replace(/^[A-Za-z]{1,15}:\/\/[w]{0,3}\.?/, '').replace(/[#?](.*)$/,'').replace(/\/$/, '');
  }
};