'use strict';
var Promise = require('es6-promise').Promise;
var AppError = require('./app-error');
var path = require('path');

module.exports = function (opts) {
  return new Promise(function(resolve, reject) {
    opts = opts || {};
    var input = opts['input'] || null;
    var cwd = opts['cwd'] || reject(new AppError('cwd: required.'));
    var field = opts['field'] || reject(new AppError('field: required.'));
    var filePath = opts['path'] || reject(new AppError('path: required.'));
    try {
      var contents = require(path.join(cwd, filePath));
    } catch (error) {
      reject(error);
    }
    var element = {};
    element[field] = contents[field];
    resolve({
      input: input,
      cwd: cwd,
      field: element
    });
  });
};
