NODE_ENV=development DEBUG=express:* ./bin/www
NODE_ENV=test mocha --recursive
NODE_ENV=production pm2 start ./bin/www

API

post /strikes                        - create a strike
post /identities                     - create an identity

get  /strikes
params = {
  no-params: "top 10 most recent strikes",
  count: { data: "number", returns: "number of most recent strikes to show" },
}

get  /references
params = {
  no-params: "top 10 references with the most strikes",
  urls: { data: "array of urls", returns: "an array references with clickshame score if any, returns a blank array if not" }
  url: { data: "url string", returns: "a reference if one exists with the specific url, returns a blank array if not" }
  count: { data: "number", returns: "the top [count] references with the most strikes" },
}

get  /domains
params = {
  no-params: "top 10 domains with the most strikes",
  domains: { data: "array of domains", returns: "an array domains with clickshame score if any, returns a blank array if not" }
  domain: { data: "domain string", returns: "an array domains with clickshame score if any, returns a blank array if not" }
  urls: { data: "array of urls", returns: "an array domains with clickshame score if any, returns a blank array if not" }
  url: { data: "url string", returns: "a domains if one exists with the specific url, returns a blank array if not" }
  count: { data: "number", returns: "the top [count] domains with the most strikes" },
}

sequelize migration:create --name [migration_name]       # Generates a new migration file.
sequelize db:migrate        # Run pending migrations.

node ./scripts/dbsync.js         # Sync db tables with models

drop table "SequelizeMeta","comments","domains","identities","references","scores","strikes" cascade;

NODE_ENV=test node ./scripts/dbsync.js
NODE_ENV=test sequelize db:migrate



resolve, reject

http://joind.in/14022


/strikes/recent
/referenes/top
/references/find
/domains/top
/domains/find


Data to track
identities created per day (already done)
identities submitting at least one strike per day (already done)
identities querying at least a few lists of urls per day (needed)

Fraud prevention, make it so identities have to be submitting queries daily in order for their strikes to count





