var models = require('../models');

models.sequelize.sync({force: true});