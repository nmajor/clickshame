var assert = require("chai").assert;
var expect = require("chai").expect;
var fixtures = require('sequelize-fixtures');
var Promise = require('bluebird');
var models = require('../../models');
var request = require('request');

describe('requests', function () {
  describe('/references', function () {

    it('gets a list of the top references with no params', function(done){
      request.get('http://localhost:3000/references/top', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(10);
        done();
      });
    });

    it('gets a list of the top 5 references', function(done){
      request.get('http://localhost:3000/references/top?count=5', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(5);
        done();
      });
    });

    it('gets a references from URL', function(done){
      var url = 'mediaite.com/tv/comet-scientist-breaks-down-in-tears-apologizing-for-sexist-shirt';
      var query = '?url='+url;
      request.get('http://localhost:3000/references/find'+query, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.url).to.equal(url);
        done();
      });
    });

    it('returns a 400 error when requesting find without parameters', function(done){
      request.get('http://localhost:3000/references/find', function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

    it('returns a 400 error when requesting find with unknown parameters', function(done){
      request.get('http://localhost:3000/references/find?blah=blah', function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

    // it('gets a list of the top references without any params', function(done){

    //   request.get('http://localhost:3000/references', function (err, res, body){
    //     body = JSON.parse(body);
    //     expect(body.length).to.equal(10);
    //     done();
    //   });

    // });

    // it('gets a list of the top 5 references', function(done){

    //   request.get('http://localhost:3000/references?count=5', function (err, res, body){
    //     body = JSON.parse(body);
    //     expect(body.length).to.equal(5);
    //     done();
    //   });

    // });

    // it('gets data for one reference', function(done){
    //   var url = 'mashable.com/2014/11/13/esa-scientist-sexist-shirt';
    //   var query = '?url='+encodeURIComponent(url);
    //   query += '&key=fz5q5DSvgy9Zj9YqvbuLMYWsJ6I74NYP5u5MPBJEyAv1OwwocwKoasND3L4DtYHHGTwsgzGgTDZKtRHq3HtAXocYLOICCFt4Ph3V';

    //   request.get('http://localhost:3000/references'+query, function (err, res, body){

    //     console.log('err'+err);
    //     console.log('res'+res);
    //     console.log('body'+body);

    //     body = JSON.parse(body);
    //     expect(body.url).to.equal(url);
    //     expect(body.Scores.length).to.be.above(0);
    //     done();
    //   });

    // });

  });
});