var assert = require("chai").assert;
var expect = require("chai").expect;
var fixtures = require('sequelize-fixtures');
var Promise = require('bluebird');
var models = require('../../models');
var request = require('request');

describe('requests', function () {
  describe('/domains', function () {

    // it('gets a list of the top domains without any params', function(done){

    //   request.get('http://localhost:3000/domains', function (err, res, body){
    //     body = JSON.parse(body);
    //     expect(body.length).to.equal(10);
    //     done();
    //   });

    // });

    // it('gets a list of the top 5 domains', function(done){

    //   request.get('http://localhost:3000/domains?count=5', function (err, res, body){
    //     body = JSON.parse(body);
    //     expect(body.length).to.equal(5);
    //     done();
    //   });

    // });

    // it('gets data for one domains', function(done){
    //   var domain = 'mashable.com';
    //   var query = '?domain='+encodeURIComponent(domain);
    //   query += '&key=fz5q5DSvgy9Zj9YqvbuLMYWsJ6I74NYP5u5MPBJEyAv1OwwocwKoasND3L4DtYHHGTwsgzGgTDZKtRHq3HtAXocYLOICCFt4Ph3V';

    //   request.get('http://localhost:3000/domains'+query, function (err, res, body){
    //     console.log('blahblah '+body);
    //     body = JSON.parse(body);
    //     expect(body.name).to.equal(domain);
    //     expect(body.Scores.length).to.be.above(0);
    //     done();
    //   });

    // });

  });
});