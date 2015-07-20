'use strict';
var Promise = require('es6-promise').Promise;
var errors = require('common-errors');
var path = require('path');
var fs = require('fs');

module.exports = function (opts) {
  return new Promise(function(resolve, reject) {
    if (!opts) {
      reject(new errors.ArgumentNullError('opts'));
    }
    if (!opts.hasOwnProperty('path') || !opts['path']){
      reject(new errors.ArgumentNullError('path'));
    }
    var filePath = path.normalize(opts['path']);
    fs.readFile(filePath, 'utf8', function (error, data) {
      if (error) {
        reject(new errors.io.FileLoadError(filePath));
      }
      try {
        var contents = JSON.parse(data);
      } catch (error) {
        reject(new errors.Error('JSON.parse', error));
      }
      resolve({
        path: filePath,
        data: contents
      });
    });
  });
};
