// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host:     'localhost',
      database: 'clickshame_development',
      user:     'clickshame',
      password: 'jf02ljf4209hksa0kopwhpw'
    },
    pool: {
      min: 1,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
