'use strict';
var Promise = require('es6-promise').Promise;
var spawn = require('cross-spawn');
var errors = require('common-errors');
var prettyFormat = require('pretty-format');

// https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
// value = ['ls', ['-al'], { stdio: 'inherit' }];
module.exports = function (value) {
  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV === 'test') {
      resolve(value);
      return;
    }
    try {
      var result = spawn.sync.apply(null, value);
    } catch (error) {
      reject(error);
      return;
    }
    if (result['error']) {
      reject(new errors.Error(
        'command: ' + prettyFormat(value), result['error']
      ));
      return;
    } else if (result['status'] !== 0) {
      reject(new errors.Error(
        'spawn sync exit status is: ' + prettyFormat(result['status']) +
        ', command: ' + prettyFormat(value)
      ));
      return;
    }
    resolve(result);
  });
};
