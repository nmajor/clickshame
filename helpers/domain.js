var models  = require('../models');
var stringHelper  = require('../helpers/string');

module.exports = {
  domainCount: function(req) {
    var max = 100;
    var def = 10;
    var count = req.query.count;

    if (!count) {
      count = def;
    } else if (count > max) {
      count = max;
    }

    return count;
  },

  topDomains: function(req, res, next) {
    count = this.domainCount(req);

    models.Domain.findAll({
      include: [ { model: models.Score, attributes: [ 'type', 'value' ] } ],
      order: '"Scores"."value" DESC',
      limit: count,
      attributes: ["name"]
    })
    .then(function(models) {
      res.json(models);
    });
  },

  searchForOneDomainByUrl: function(req, res, next) {
    domain = stringHelper.getDomainNameFromUrl(req.query.url);

    this.searchForOneDomainByDomain(req, res, next, domain);
  },

  searchForManyDomainsByUrl: function(req, res, next) {
    if (!Array.isArray(req.query.domains)) return res.status(501).send('You have to pass in an array for the "domains" parameter');

    var domains = req.query.urls;
    for(i=0; i<domains.length; i++) {
      domains[i] = stringHelper.getDomainNameFromUrl(domains[i]);
    }

    this.searchForManyDomainsByDomain(req, res, next, domains);
  },

  searchForOneDomainByDomain: function(req, res, next, domain) {

    models.Domain.find({
      include: [ { model: models.Score, attributes: [ 'type', 'value' ] } ],
      where: { name: domain },
      attributes: [ "name" ]
    }).then(function(models) {
      if (!models) return res.json({});
      res.json(models);
    });
  },

  searchForManyDomainsByDomain: function(req, res, next, domains) {
    if (!Array.isArray(req.query.domains)) return res.status(501).send('You have to pass in an array for the "domains" parameter');

    models.Domain.findAll({
      include: [ { model: models.Score, attributes: [ 'type', 'value' ] } ],
      where: { name: domains },
      attributes: [ "name" ]
    }).then(function(models) {
      if (!models) return res.json([]);
      res.json(models);
    });
  },

  searchDomainsByUrl: function(req, res, next) {
    if ( req.query.urls ) {
      this.searchForManyDomainsByUrl(req, res, next);
    } else if ( req.query.url ) {
      this.searchForOneDomainByUrl(req, res, next);
    }
  },

  searchDomainsByDomain: function(req, res, next) {
    if ( req.query.domains ) {
      this.searchForManyDomainsByDomain(req, res, next, req.query.domains);
    } else if ( req.query.domain ) {
      this.searchForOneDomainByDomain(req, res, next, req.query.domain);
    }
  },
};