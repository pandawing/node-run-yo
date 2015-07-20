'use strict';
var Promise = require('es6-promise').Promise;
var spawnSync = require('child_process').spawnSync;

module.exports = function (opts) {
  var options = { stdio: 'inherit' };
  var command = ['ls', ['-al'], JSON.parse(JSON.stringify(options))];

  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV === 'test') {
      var result = console.log.apply(null, command);
      resolve({result: result});
    } else {
      spawnSync.apply(null, command);
      resolve();
    }
  });
};
