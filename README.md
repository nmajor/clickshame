NODE_ENV=development DEBUG=express:* ./bin/www
NODE_ENV=test mocha --recursive
NODE_ENV=production pm2 start ./bin/www

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

www-3 (err):     at MappingPromiseArray.init [as _init$] (/home/deployer/clickshame/node_modules/bluebird/js/main/promise_array.js:92:18)
www-3 (err):     at MappingPromiseArray.init (/home/deployer/clickshame/node_modules/bluebird/js/main/map.js:27:23)
www-3 (err):     at Async._drainQueue (/home/deployer/clickshame/node_modules/bluebird/js/main/async.js:180:12)
www-3 (err):     at Async._drainQueues (/home/deployer/clickshame/node_modules/bluebird/js/main/async.js:185:10)
www-3 (err):     at Async.drainQueues (/home/deployer/clickshame/node_modules/bluebird/js/main/async.js:15:14)
www-3 (err):     at process._tickCallback (node.js:415:13)
www-3 (err): Possibly unhandled URIError: URI malformed
www-3 (err):     at decodeURIComponent (native)
www-3 (err):     at Object.module.exports.cleanUrl (/home/deployer/clickshame/helpers/string.js:18:18)
www-3 (err):     at Object.module.exports.isShort (/home/deployer/clickshame/helpers/url.js:13:33)
www-3 (err):     at Object.module.exports.pickyLongUrl (/home/deployer/clickshame/helpers/url.js:41:29)
www-3 (err):     at module.exports.pickyLongUrlToHash (/home/deployer/clickshame/helpers/url.js:52:22)
www-3 (err):     at tryCatcher (/home/deployer/clickshame/node_modules/bluebird/js/main/util.js:24:31)
www-3 (err):     at MappingPromiseArray._promiseFulfilled (/home/deployer/clickshame/node_modules/bluebird/js/main/map.js:54:38)
www-3 (err):     at MappingPromiseArray.init [as _init$] (/home/deployer/clickshame/node_modules/bluebird/js/main/promise_array.js:92:18)
www-3 (err):     at MappingPromiseArray.init (/home/deployer/clickshame/node_modules/bluebird/js/main/map.js:27:23)
www-3 (err):     at Async._drainQueue (/home/deployer/clickshame/node_modules/bluebird/js/main/async.js:180:12)
www-3 (err):     at Async._drainQueues (/home/deployer/clickshame/node_modules/bluebird/js/main/async.js:185:10)
www-3 (err):     at Async.drainQueues (/home/deployer/clickshame/node_modules/bluebird/js/main/async.js:15:14)
www-3 (err):     at process._tickCallback (node.js:415:13)

