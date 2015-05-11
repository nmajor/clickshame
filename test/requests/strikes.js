var assert = require("chai").assert;
var expect = require("chai").expect;
var fixtures = require('sequelize-fixtures');
var Promise = require('bluebird');
var models = require('../../models');
var request = require('request');

describe('requests', function () {
  describe('/strikes', function () {

    it('sends a post request to create a strike', function(done){
      models.Identity
      .create({source: 'chrome'})
      .then(function (identity) {
        var data = {
          key: identity.key,
          type: 'misleading_title',
          comment: 'this post sucks',
          url: 'http://www.create-strike-post-request-test3.com/rubenguevara/how-many-of-these-fast-food-menu-items-have-you-tried#.ciX16mbAq'
        };

        request.post({
          url: 'http://localhost:3000/strikes',
          form: data
        }, function (err, res, body){
          console.log('body ' + body);
          expect(res.statusCode).to.equal(200);
          body = JSON.parse(body);

          expect(body.type).to.equal(data.type);
          expect(body.comment).to.equal(data.comment);
          expect(body.url).to.equal(data.url);

          expect(body.created_at).to.be.ok;

          expect(body.key).to.not.be.ok;
          expect(body.id).to.not.be.ok;
          expect(body.identity_id).to.not.be.ok;
          expect(body.reference_id).to.not.be.ok;
          expect(body.domain_id).to.not.be.ok;
          done();
        });

      });
    });

    it('returns a 400 error when given an invalid identity key in post request', function(done){
      var data = {
        key: 'jf802fn923i09fn83209fn80382n0fn83092n8f0329nupofyogfoiyhul',
        type: 'misleading_title',
        comment: 'this post sucks',
        url: 'http://www.create-strike-post-request-test.com/rubenguevara/how-many-of-these-fast-food-menu-items-have-you-tried#.ciX16mbAq'
      };

      request.post({
        url: 'http://localhost:3000/strikes',
        form: data
      }, function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Invalid identity key.');
        done();
      });
    });

    it('returns a 400 error when type is missing from post request', function(done){
      var data = {
        key: 'jf802fn923i09fn83209fn80382n0fn83092n8f0329nupofyogfoiyhul',
        comment: 'this post sucks',
        url: 'http://www.create-strike-post-request-test.com/rubenguevara/how-many-of-these-fast-food-menu-items-have-you-tried#.ciX16mbAq'
      };

      request.post({
        url: 'http://localhost:3000/strikes',
        form: data
      }, function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

    it('returns a 400 error when key is missing from post request', function(done){
      var data = {
        type: 'misleading_title',
        comment: 'this post sucks',
        url: 'http://www.create-strike-post-request-test.com/rubenguevara/how-many-of-these-fast-food-menu-items-have-you-tried#.ciX16mbAq'
      };

      request.post({
        url: 'http://localhost:3000/strikes',
        form: data
      }, function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

    it('returns a 400 error when url is missing from post request', function(done){
      var data = {
        key: 'jf802fn923i09fn83209fn80382n0fn83092n8f0329nupofyogfoiyhul',
        type: 'misleading_title',
        comment: 'this post sucks',
      };

      request.post({
        url: 'http://localhost:3000/strikes',
        form: data
      }, function (err, res, body){
        expect(res.statusCode).to.equal(400);
        body = JSON.parse(body);
        expect(body.error).to.be.ok;
        expect(body.error).to.equal('Missing required parameters.');
        done();
      });
    });

    it('gets a list of most recent strikes no params', function(done){
      request.get('http://localhost:3000/strikes/recent', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(10);
        done();
      });
    });

    it('gets a list of the 5 most recent strikes', function(done){
      request.get('http://localhost:3000/strikes/recent?count=5', function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);
        expect(body.length).to.equal(5);
        done();
      });
    });

    it('Gets a 400 error when trying to submit an existing strike by key and url', function(done){
      models.Strike.find({ where: { url: 'http://mashable.com/2014/11/13/esa-scientist-sexist-shirt/' }, include: [{ model: models.Identity, attributes: [ 'key' ] }] })
      .then(function(strike) {

        var data = {
          key: strike.Identity.key,
          type: 'misleading_title',
          comment: 'this post sucks',
          url: encodeURIComponent(strike.url)
        };

        request.post({
          url: 'http://localhost:3000/strikes',
          form: data
        }, function (err, res, body){
          expect(res.statusCode).to.equal(400);
          body = JSON.parse(body);
          expect(body.error).to.be.ok;
          expect(body.error).to.equal('You have already submitted this url.');
          done();
        });
      });
    });

  });
});