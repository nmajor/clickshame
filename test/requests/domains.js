var assert = require("chai").assert;
var expect = require("chai").expect;
var fixtures = require('sequelize-fixtures');
var Promise = require('bluebird');
var models = require('../../models');
var request = require('request');

describe('requests', function () {
  describe('/domains', function () {

    it('gets a list of the top domains with no params', function(done){
      request.get('http://localhost:3000/domains/top?key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(10);
        done();
      });
    });

    it('gets a list of the top 5 domains', function(done){
      request.get('http://localhost:3000/domains/top?key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo&count=5', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(5);
        done();
      });
    });

    it('Returns a 400 error if request sent with invalid key', function(done){
      request.get('http://localhost:3000/domains/top?key=GhcM92AQjotgUu9lzkwWJFWyJFJOFMIONFDIOJkfjkldsjfdsoijfodis&count=5', function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Invalid identity key.');
        done();
      });
    });

    it('gets a domain from URL', function(done){
      var url = 'http://mediaite.com/tv/comet-scientist-breaks-down-in-tears-apologizing-for-sexist-shirt';
      var query = '?url='+encodeURIComponent(url);
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'
      request.get('http://localhost:3000/domains/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.name).to.equal('mediaite.com');
        done();
      });
    });

    it('gets a domain from URL with POST request', function(done){
      var url = 'http://mediaite.com/tv/comet-scientist-breaks-down-in-tears-apologizing-for-sexist-shirt';

      var data = {
        key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo',
        url: url
      };

      request.post({
        url: 'http://localhost:3000/domains/find',
        form: data
      }, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.name).to.equal('mediaite.com');
        done();
      });
    });

    it('gets a domain from domain', function(done){
      var query = '?domain='+encodeURIComponent('mediaite.com');
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'
      request.get('http://localhost:3000/domains/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.name).to.equal('mediaite.com');

        expect(body.Scores).to.be.ok;
        expect(body.Scores[0]).to.be.ok;
        expect(body.Scores[0].type).to.be.ok;
        expect(body.Scores[0].value).to.be.ok;

        expect(body.id).to.not.be.ok;
        expect(body.name_hash).to.not.be.ok;
        expect(body.scored).to.not.be.ok;
        expect(body.updated_at).to.not.be.ok;
        expect(body.created_at).to.not.be.ok;
        done();
      });
    });

    it('gets a domain from hash', function(done){
      var domain = 'huffingtonpost.com';
      var query = '?hash='+require('crypto').createHash('md5').update(domain).digest("hex");
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'
      request.get('http://localhost:3000/domains/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.name).to.equal(domain);
        done();
      });
    });

    it('gets a domains from an array of URLs', function(done){
      var query = '?urls[]='+encodeURIComponent('http://mashable.com/2014/11/13/esa-scientist-sexist-shirt/');
      query += '&urls[]='+encodeURIComponent('http://distractify.com/jake-heppner/scenes-from-the-past-you-never-expected-never-seen-before/');
      query += '&urls[]='+encodeURIComponent('http://www.mediaite.com/tv/comet-scientist-breaks-down-in-tears-apologizing-for-sexist-shirt/');
      query += '&urls[]='+encodeURIComponent('http://www.huffingtonpost.com/thomas-church/ryan-holiday-trust-me-im-lying_b_1715524.html');
      query += '&urls[]='+encodeURIComponent('http://www.huffingtonpost.com/peggy-drexler/-will-we-ever-get-along-again_b_7162050.html');
      query += '&urls[]='+encodeURIComponent('http://www.upworthy.com/youve-seen-these-works-of-art-but-youve-probably-never-seen-them-gluten-free-feast-your-eyes?c=hpstream');
      query += '&urls[]='+encodeURIComponent('http://www.upworthy.com/a-condom-fundraising-video-that-has-it-all-unicorns-two-goofy-german-guys-and-hilarious-visuals?c=reccon1');
      query += '&urls[]='+encodeURIComponent('http://www.buzzfeed.com/clairedelouraille/insanely-adorable-knitted-creatures#.qvmQNnL5X');
      query += '&urls[]='+encodeURIComponent('http://www.buzzfeed.com/candacelowry/these-buddies-in-china-live-their-lives-according-to-friends#.kmR9NZ6gV');
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'

      request.get('http://localhost:3000/domains/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(6);
        expect(body[0].name).to.be.ok;
        expect(body[0].Scores).to.be.ok;
        expect(body[0].Scores[0].type).to.be.ok;
        expect(body[0].Scores[0].value).to.be.ok;
        done();
      });
    });

    it('gets a domains from an array of URLs with a POST request', function(done){
      var data = {
        urls: [
          'http://mashable.com/2014/11/13/esa-scientist-sexist-shirt/',
          'http://distractify.com/jake-heppner/scenes-from-the-past-you-never-expected-never-seen-before/',
          'http://www.mediaite.com/tv/comet-scientist-breaks-down-in-tears-apologizing-for-sexist-shirt/',
          'http://www.huffingtonpost.com/thomas-church/ryan-holiday-trust-me-im-lying_b_1715524.html',
          'http://www.huffingtonpost.com/peggy-drexler/-will-we-ever-get-along-again_b_7162050.html',
          'http://www.upworthy.com/youve-seen-these-works-of-art-but-youve-probably-never-seen-them-gluten-free-feast-your-eyes?c=hpstream',
          'http://www.upworthy.com/a-condom-fundraising-video-that-has-it-all-unicorns-two-goofy-german-guys-and-hilarious-visuals?c=reccon1',
          'http://www.buzzfeed.com/clairedelouraille/insanely-adorable-knitted-creatures#.qvmQNnL5X',
          'http://www.buzzfeed.com/candacelowry/these-buddies-in-china-live-their-lives-according-to-friends#.kmR9NZ6gV' ],
        key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'
      };

      request.post({
        url: 'http://localhost:3000/domains/find',
        json: data,
      }, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        if ( typeof(body) === 'string' ) { body = JSON.parse(body); }
        expect(body.length).to.equal(6);
        expect(body[0].name).to.be.ok;
        expect(body[0].Scores).to.be.ok;
        expect(body[0].Scores[0].type).to.be.ok;
        expect(body[0].Scores[0].value).to.be.ok;
        done();
      });
    });

    it('gets a domain from hash', function(done){
      var domain = 'huffingtonpost.com';
      var query = '?hash='+require('crypto').createHash('md5').update(domain).digest("hex");
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'
      request.get('http://localhost:3000/domains/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.name).to.equal(domain);
        done();
      });
    });

    it('gets a domains from an array of URLs', function(done){
      var query = '?domains[]='+encodeURIComponent('mashable.com');
      query += '&domains[]='+encodeURIComponent('distractify.com');
      query += '&domains[]='+encodeURIComponent('mediaite.com');
      query += '&domains[]='+encodeURIComponent('huffingtonpost.com');
      query += '&domains[]='+encodeURIComponent('huffingtonpost.com');
      query += '&domains[]='+encodeURIComponent('upworthy.com');
      query += '&domains[]='+encodeURIComponent('upworthy.com');
      query += '&domains[]='+encodeURIComponent('buzzfeed.com');
      query += '&domains[]='+encodeURIComponent('buzzfeed.com');
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'

      request.get('http://localhost:3000/domains/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(6);
        expect(body[0].name).to.be.ok;
        expect(body[0].Scores).to.be.ok;
        expect(body[0].Scores[0].type).to.be.ok;
        expect(body[0].Scores[0].value).to.be.ok;
        done();
      });
    });

    it('gets a domains from an array of hashes', function(done){

      var query = '?hashes[]='+'b5f07f82860eb25681a9a8a477cc1ce4';
      query += '&hashes[]='+'0996899020a000cdf592f8645bd7c621';
      query += '&hashes[]='+'655a81cc445cb27039c89f6dca37336a';
      query += '&hashes[]='+'95ec266b244de718b80c652a08af06fa';
      query += '&hashes[]='+'95ec266b244de718b80c652a08af06fa';
      query += '&hashes[]='+'1c5a0df635c4979405d90480e0d1ad6d';
      query += '&hashes[]='+'1c5a0df635c4979405d90480e0d1ad6d';
      query += '&hashes[]='+'23651cdb658ea0d4203178a157359bf2';
      query += '&hashes[]='+'23651cdb658ea0d4203178a157359bf2';
      query += '&key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'

      request.get('http://localhost:3000/domains/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(6);
        expect(body[0].name).to.be.ok;
        expect(body[0].Scores).to.be.ok;
        expect(body[0].Scores[0].type).to.be.ok;
        expect(body[0].Scores[0].value).to.be.ok;
        done();
      });
    });

    it('returns a 400 error when requesting find without parameters', function(done){
      request.get('http://localhost:3000/domains/find?key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

    it('returns a 400 error when requesting find with unknown parameters', function(done){
      request.get('http://localhost:3000/domains/find?key=GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo&color=yellow', function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

  });
});