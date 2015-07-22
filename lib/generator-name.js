'use strict';
var Promise = require('es6-promise').Promise;
var errors = require('common-errors');
var isPackage = require('is-package');
var isScopedPackage = require('is-scoped-package');
var removePrefixedGenerator = require('./remove-prefixed-generator');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.TypeError('generator name must be string'));
      return;
    }
    if (!isPackage) {
      reject(new errors.ArgumentError('this is not package name: ' + value));
      return;
    } else {
      if (isScopedPackage) {
        var split = value.split('/');
        removePrefixedGenerator(split[1], function (err, data) {
          if (err) {
            reject(err);
            return;
          }
          resolve(split[0] + '/' + data);
          return;
        });
      } else {
        removePrefixedGenerator(value, function (err, data) {
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
