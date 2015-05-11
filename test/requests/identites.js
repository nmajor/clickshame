var assert = require("chai").assert;
var expect = require("chai").expect;
var request = require('request');
var models = require('../../models');

describe('requests', function () {
  describe('/identities', function () {

    it('sends a post request to create an identity', function(done){
      var source = 'chrome';
      request.post({
        url: 'http://localhost:3000/identities',
        form: { source: source }
      }, function (err, res, body){
        expect(res.statusCode).to.equal(200);
        body = JSON.parse(body);

        expect(body.source).to.equal(source);
        expect(body.key.length).to.be.above(0);
        expect(body.id).to.not.be.ok;
        done();
      });

    });

  });
});