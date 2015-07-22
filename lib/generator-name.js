'use strict';
var Promise = require('es6-promise').Promise;
var errors = require('common-errors');
var isPackage = require('is-package');
var isScopedPackage = require('is-scoped-package');
var removeGeneratorPrefix = require('./remove-generator-prefix');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.TypeError('generator name must be string'));
      return;
    }
    if (!isPackage(value)) {
      reject(new errors.ArgumentError('this is not package name: ' + value));
      return;
    } else {
      if (isScopedPackage(value)) {
        var split = value.split('/');
        removeGeneratorPrefix(split[1], function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          resolve(split[0] + '/' + data);
          return;
        });
      } else {
        removeGeneratorPrefix(value, function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
          return;
        });
      }
    }
  });
};
