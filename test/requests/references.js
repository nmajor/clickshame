var assert = require("chai").assert;
var expect = require("chai").expect;
var fixtures = require('sequelize-fixtures');
var Promise = require('bluebird');
var models = require('../../models');
var request = require('request');

describe('requests', function () {
  describe('/references', function () {

    it('gets a list of the top references with no params', function(done){
      request.get('http://localhost:3000/references/top?key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        console.log('blahbody '+body);
        body = JSON.parse(body);
        expect(body.length).to.equal(10);
        done();
      });
    });

    it('gets a list of the top 5 references', function(done){
      request.get('http://localhost:3000/references/top?key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo&count=5', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(5);
        done();
      });
    });

    it('gets a reference from URL', function(done){
      var url = 'mediaite.com/tv/comet-scientist-breaks-down-in-tears-apologizing-for-sexist-shirt';
      var query = '?url='+url;
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo';
      request.get('http://localhost:3000/references/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.url).to.equal(url);
        done();
      });
    });

    it('gets a reference from hash', function(done){
      var url = 'huffingtonpost.com/thomas-church/ryan-holiday-trust-me-im-lying_b_1715524.html';
      var query = '?hash='+require('crypto').createHash('md5').update(url).digest("hex");
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo';
      request.get('http://localhost:3000/references/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.url).to.equal(url);
        done();
      });
    });

    it('gets a references from an array of URLs', function(done){
      var query = '?urls[]='+encodeURIComponent('http://mashable.com/2014/11/13/esa-scientist-sexist-shirt/');
      query += '&urls[]='+encodeURIComponent('http://distractify.com/jake-heppner/scenes-from-the-past-you-never-expected-never-seen-before/');
      query += '&urls[]='+encodeURIComponent('http://www.mediaite.com/tv/comet-scientist-breaks-down-in-tears-apologizing-for-sexist-shirt/');
      query += '&urls[]='+encodeURIComponent('http://www.huffingtonpost.com/thomas-church/ryan-holiday-trust-me-im-lying_b_1715524.html');
      query += '&urls[]='+encodeURIComponent('http://www.huffingtonpost.com/peggy-drexler/-will-we-ever-get-along-again_b_7162050.html');
      query += '&urls[]='+encodeURIComponent('http://www.upworthy.com/youve-seen-these-works-of-art-but-youve-probably-never-seen-them-gluten-free-feast-your-eyes?c=hpstream');
      query += '&urls[]='+encodeURIComponent('http://www.upworthy.com/a-condom-fundraising-video-that-has-it-all-unicorns-two-goofy-german-guys-and-hilarious-visuals?c=reccon1');
      query += '&urls[]='+encodeURIComponent('http://www.buzzfeed.com/clairedelouraille/insanely-adorable-knitted-creatures#.qvmQNnL5X');
      query += '&urls[]='+encodeURIComponent('http://www.buzzfeed.com/candacelowry/these-buddies-in-china-live-their-lives-according-to-friends#.kmR9NZ6gV');
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo';

      request.get('http://localhost:3000/references/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(4);
        expect(body[0].url).to.be.ok;
        expect(body[0].Scores).to.be.ok;
        expect(body[0].Scores[0].type).to.be.ok;
        expect(body[0].Scores[0].value).to.be.ok;
        done();
      });
    });

    it('gets a references from an array of hashes', function(done){
      var query = '?hashes[]='+'0f467099b28df4b90fcd63ec9316fdb4';
      query += '&hashes[]='+'d2dcf6de5343c38b0c73b5571b0e963f';
      query += '&hashes[]='+'3f6b1969dfb5f428c75541a81cefc652';
      query += '&hashes[]='+'489b550c8a5e41a0280576efe411ac4a';
      query += '&hashes[]='+'181afd7b3a8f9b97db56bcc72a6ec528';
      query += '&hashes[]='+'129cee9c690d6db00034d4fd0c1a74a7';
      query += '&hashes[]='+'33eddadd611b92ce24bdf4729646faff';
      query += '&hashes[]='+'afd56cb763dfe97caf0fb217790cae71';
      query += '&hashes[]='+'55302558e8f9bbf0b460f10946907eef';
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo';


      request.get('http://localhost:3000/references/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(4);
        expect(body[0].url).to.be.ok;
        expect(body[0].Scores).to.be.ok;
        expect(body[0].Scores[0].type).to.be.ok;
        expect(body[0].Scores[0].value).to.be.ok;
        done();
      });
    });


    it('returns a 400 error when requesting find without parameters', function(done){
      request.get('http://localhost:3000/references/find?key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

    it('returns a 400 error when requesting find with unknown parameters', function(done){
      request.get('http://localhost:3000/references/find?key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo&color=yellow', function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

  });
});