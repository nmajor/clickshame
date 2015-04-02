DEBUG=clickshame ./bin/www


API

post /strikes                        - submit a strike
get  /strikes/count=[:number]        - get an array of the most recent strikes. Default 10. Limit 100.

get  /references                     - get an array of references from an array of urls.
get  /references/:url                - get one reference from a url.
get  /references/top?count=[:number] - get an array of the top references by score. Default 10. limit 100.

get  /domains                        - get an array of domains from an array of urls.
get  /domains/:url                   - get one domain from a url.
get  /domains/top?count=[:number]    - get an array of the top domains by score. Default 10. limit 100.

get /identities                      - get an identity id




Knex.js
knex migrate:make create_strikes // Make migration file
knex migrate:latest // Migrate
knex seed:make seed_name // Make seed file
knex seed:run // Run seed files