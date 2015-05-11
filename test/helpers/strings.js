var assert = require("chai").assert;

describe('string helpers', function () {
  var stringHelper = require('../../helpers/string');

  describe('getDomainNameFromUrl()', function(){
    it('should return domain name when given a url', function(done){
      assert.equal('buzzfeed.com', stringHelper.getDomainNameFromUrl('http://www.buzzfeed.com/stuff/blah-you-will-rule-the-world#.fenk86nxX'));
      done();
    });

    it('should remove subdoman when it is www', function(done){
      assert.equal('buzzfeed.com', stringHelper.getDomainNameFromUrl('http://www.buzzfeed.com/stuff/blah-you-will-rule-the-world#.fenk86nxX'));
      done();
    });

    it('should preserve subdoman when it is NOT www', function(done){
      assert.equal('sub.buzzfeed.com', stringHelper.getDomainNameFromUrl('http://sub.buzzfeed.com/stuff/blah-you-will-rule-the-world#.fenk86nxX'));
      done();
    });
  });

  describe('cleanUrl()', function(){
    it('should return a stripped reference name when given a url', function(done){
      assert.equal('buzzfeed.com/stuff/blah-you-will-rule-the-world', stringHelper.cleanUrl('http://www.buzzfeed.com/stuff/blah-you-will-rule-the-world#.fenk86nxX'));
      done();
    });

    it('should preserve subdoman when it is NOT www', function(done){
      assert.equal('sub.buzzfeed.com/stuff/blah-you-will-rule-the-world', stringHelper.cleanUrl('http://sub.buzzfeed.com/stuff/blah-you-will-rule-the-world#.fenk86nxX'));
      done();
    });
  });

  describe('randomString()', function(){
    it('should return a [length] character string when given [length]', function(done){
      assert.equal(100, stringHelper.randomString(100).length);
      done();
    });
  });

});