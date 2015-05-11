var app = require('../app');
var models = require('../models');
var fixtures = require('sequelize-fixtures');
var dbseed = require('../modules/dbseed');
var dbclear = require('../modules/dbclear');
var server;

before(function (done) {
  models.Strike.findAll({ where: true }).then(function(models) {
    if ( models.length > 0 ) {
      server = app.listen(3000);
      done();
    } else {
      dbseed.run().then(function() {
        server = app.listen(3000);
        done();
      });
    }
  });

});

after(function () {
  server.close();
});