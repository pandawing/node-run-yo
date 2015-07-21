'use strict';
var errors = require('common-errors');
var Promise = require('es6-promise').Promise;
var isPackage = require('is-package');
var path = require('path');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.ArgumentNullError('value'));
    }
    ['input', 'packageName'].forEach(function (key) {
      if(!value.hasOwnProperty(key) || !value[key]) {
        reject(new errors.ArgumentNullError(key));
      }
    });
    if (!isPackage(value['packageName'])) {
      reject(new errors.ArgumentError(value['packageName'] + 'is not package'));
    }
    resolve(path.join(value['input'], value['packageName']));
  });
};
