'use strict';
var Promise = require('es6-promise').Promise;
var spawn = require('cross-spawn');
var errors = require('common-errors');
var prettyFormat = require('pretty-format');
var envPath;
var path = require('path');

// https://nodejs.org/api/child_process.html#child_process_child_process_spawnsync_command_args_options
// value = ['ls', ['-al'], { stdio: 'inherit' }];
module.exports = function (value) {
  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV === 'test') {
      resolve(value);
      return;
    }
    envPath = process.env.PATH;
    var command = value[0];
    if (path.dirname(command) !== '.') {
      process.env.PATH = path.normalize(path.dirname(command)) + path.delimiter + process.env.PATH;
      value[0] = path.basename(command);
    }
    try {
      var result = spawn.sync.apply(null, value);
    } catch (error) {
      process.env.PATH = envPath;
      reject(error);
      return;
    }
    process.env.PATH = envPath;
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
