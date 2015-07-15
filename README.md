NODE_ENV=development DEBUG=express:* ./bin/www
NODE_ENV=test mocha --recursive
NODE_ENV=production pm2 start ./bin/www

NODE_ENV=test mocha --grep BUG --recursive

GET paths
/strikes/recent
/referenes/top
/references/find
/domains/top
/domains/find

POST paths
/strikes
/identities
/references/find
/domains/find