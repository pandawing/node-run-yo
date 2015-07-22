'use strict';
var Promise = require('es6-promise').Promise;
var spawn = require('cross-spawn');
var objectAssign = require('object-assign');

module.exports = function (opts) {
  // FIXME: opts
  opts;
  var options = { stdio: 'inherit' };
  var command = ['ls', ['-al'], objectAssign({}, options)];

  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV === 'test') {
      var result = console.log.apply(null, command);// eslint-disable-line no-console
      resolve({result: result});
    } else {
      try {
        spawn.sync.apply(null, command);
      } catch (error) {
        reject(error);
        return;
      }
      resolve();
    }
  });
};
