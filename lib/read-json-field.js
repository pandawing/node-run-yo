'use strict';
var Promise = require('es6-promise').Promise;
var AppError = require('./app-error');
var path = require('path');

module.exports = function (opts) {
  return new Promise(function(resolve, reject) {
    if (!opts) {
      reject(new AppError('opts: required.'));
    }
    ['cwd', 'field', 'path'].forEach(function (value) {
      if (!opts.hasOwnProperty(value) || !opts[value]) {
        reject(new AppError(value + ': required.'));
      }
    });
    var cwd = opts['cwd'];
    var field = opts['field'];
    var filePath = opts['path'];
    try {
      var contents = require(path.join(cwd, filePath));
    } catch (error) {
      reject(error);
    }
    var element = {};
    element[field] = contents[field];
    resolve({
      cwd: cwd,
      field: element
    });
  });
};
