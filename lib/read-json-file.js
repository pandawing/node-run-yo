'use strict';
var Promise = require('es6-promise').Promise;
var errors = require('common-errors');
var path = require('path');
var fs = require('fs');

module.exports = function (value) {
  return new Promise(function(resolve, reject) {
    if (!value) {
      reject(new errors.ArgumentNullError('value'));
      return;
    }
    if(!value.hasOwnProperty('path') || !value['path']) {
      reject(new errors.ArgumentNullError('path'));
      return;
    }

    var filePath = path.normalize(value['path']);
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(new errors.io.FileLoadError(filePath));
        return;
      }
      try {
        var contents = JSON.parse(data);
      } catch (error) {
        reject(new errors.Error('JSON.parse', error));
        return;
      }
      resolve(contents);
    });
  });
};
