var models = require('../models');
var fixtures = require('sequelize-fixtures');

fixtures.loadFile('fixtures/identities.json', models).then(function(){
  fixtures.loadFile('fixtures/strikes.json', models).then(function(){
  });
});