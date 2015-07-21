'use strict';
var Promise = require('es6-promise').Promise;
var errors = require('common-errors');
var path = require('path');
var fs = require('fs');

module.exports = function (value) {
  return new Promise(function(resolve, reject) {
    if (!value) {
      throw new errors.ArgumentNullError('value');
    }
    ['path'].forEach(function (key) {
      if(!value.hasOwnProperty(key) || !value[key]) {
        throw new errors.ArgumentNullError(key);
      }
    });

    var filePath = path.normalize(value['path']);
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(new errors.io.FileLoadError(filePath));
      } else {
        try {
          var contents = JSON.parse(data);
        } catch (error) {
          reject(new errors.Error('JSON.parse', error));
        }
        resolve(contents);
      }
    });
  });
};
