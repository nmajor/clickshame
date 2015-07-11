#!/usr/bin/env node

var pm2 = require('pm2');

pm2.connect(function() {
  pm2.start({
    "name"             : "clickshame",
    "cwd"              : "/home/deployer/clickshame",
    script    : './bin/www',      // Script to be run
    exec_mode : 'cluster',        // Allow your app to be clustered
    instances : 1,                // Optional: Scale your app by 4
    // max_memory_restart : '100M'   // Optional: Restart your app if it reaches 100Mo
    "error_file" : "/home/deployer/logs/clickshame.stderr.log",
    "env": {
      "NODE_ENV": "production",
    } 
  }, function(err, apps) {
    pm2.disconnect();
  });
});
