'use strict';
var Promise = require('es6-promise').Promise;
var spawnSync = require('child_process').spawnSync;

module.exports = function (opts) {
  // FIXME: opts
  opts;
  var options = { stdio: 'inherit' };
  var command = ['ls', ['-al'], JSON.parse(JSON.stringify(options))];

  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV === 'test') {
      var result = console.log.apply(null, command);// eslint-disable-line no-console
      resolve({result: result});
    } else {
      try {
        spawnSync.apply(null, command);
      } catch (error) {
        reject(error);
      }
      resolve();
    }
  });
};
