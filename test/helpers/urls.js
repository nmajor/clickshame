var assert = require("chai").assert;

describe('url helpers', function () {
  var urlHelper = require('../../helpers/url');
  var stringHelper = require('../../helpers/url');

  describe('longUrlsToHashes()', function(){
    it('should return an array of hashes when given an array of urls', function(done){
      var urls = [
        'http://u.pw/1PxYjpF',
        'http://www.buzzfeed.com/samimain/also-hes-cute#.fvOZLQ1me',
        'http://www.upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years?c=pop'
      ];
      var hashes = [
        { originalUrl: 'u.pw/1PxYjpF', hash: '1d32e353f67c98964555f318d0a89fee' },
        { originalUrl: 'buzzfeed.com/samimain/also-hes-cute', hash: '2fa238d2f9ea29a9d37718b52a466c65' },
        { originalUrl: 'upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years', hash: '1d32e353f67c98964555f318d0a89fee' },
      ];

      urlHelper.longUrlsToHashes(urls)
      .then(function(response) {
        assert.equal(hashes[0].originalUrl, response[0].originalUrl);
        assert.equal(hashes[0].hash, response[0].hash);

        assert.equal(hashes[1].originalUrl, response[1].originalUrl);
        assert.equal(hashes[1].hash, response[1].hash);

        assert.equal(hashes[2].originalUrl, response[2].originalUrl);
        assert.equal(hashes[2].hash, response[2].hash);
        done();
      });

    });
  });

  describe('longUrls()', function(){
    it('should return an array of hashes when given an array of urls', function(done){
      var urlsWithShort = [
        'http://u.pw/1PxYjpF',
        'http://www.buzzfeed.com/samimain/also-hes-cute#.fvOZLQ1me',
        'http://www.upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years?c=pop'
      ];
      var longUrls = [
        { originalUrl: 'u.pw/1PxYjpF', url: 'upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years' },
        { originalUrl: 'buzzfeed.com/samimain/also-hes-cute', url: 'buzzfeed.com/samimain/also-hes-cute' },
        { originalUrl: 'upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years', url: 'upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years' },
      ];

      urlHelper.longUrls(urlsWithShort)
      .then(function(response) {
        assert.equal(longUrls[0].originalUrl, response[0].originalUrl);
        assert.equal(longUrls[0].url, response[0].url);

        assert.equal(longUrls[1].originalUrl, response[1].originalUrl);
        assert.equal(longUrls[1].url, response[1].url);

        assert.equal(longUrls[2].originalUrl, response[2].originalUrl);
        assert.equal(longUrls[2].url, response[2].url);
        done();
      });

    });
  });

  describe('isShort()', function(){
    it('should return true for short urls', function(done){
      assert.ok(urlHelper.isShort('http://u.pw/1PxYjpF'));
      done();
    });

    it('should return false for long urls', function(done){
      assert.notOk(urlHelper.isShort('http://www.upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years?c=pop'));
      done();
    });

  });

  describe('longUrl()', function(){
    it('should return a long url when given a short url', function(done){
      urlHelper.longUrl('http://u.pw/1PxYjpF')
      .then(function(result) {
        assert.equal('upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years', result.url);
        assert.equal('u.pw/1PxYjpF', result.originalUrl);
        done();
      });
    });

    it('should return a long url when given a long url', function(done){
      urlHelper.longUrl('http://upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years')
      .then(function(result) {
        assert.equal('upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years', result.url);
        assert.equal('upworthy.com/a-92-year-old-world-war-ii-fighter-pilot-flies-her-plane-for-the-first-time-in-70-years', result.originalUrl);
        done();
      });
    });

    it('should return a hash when given a short url', function(done){
      urlHelper.longUrl('http://u.pw/1PxYjpF', true)
      .then(function(result) {
        assert.equal('1d32e353f67c98964555f318d0a89fee', result.hash);
        assert.equal('u.pw/1PxYjpF', result.originalUrl);
        done();
      });
    });

  });

});