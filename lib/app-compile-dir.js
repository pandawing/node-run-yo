'use strict';
var errors = require('common-errors');
var Promise = require('es6-promise').Promise;
var isPackage = require('is-package');
var path = require('path');
var removeTrailingSeparator = require('./remove-trailing-separator');

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
    var packageName = value['packageName'];
    var input = removeTrailingSeparator(value['input']);
    if (!isPackage(packageName)) {
      reject(new errors.ArgumentError(packageName + 'is not package'));
    }
    var split = path.normalize(input).split(path.sep);
    if (split[split.length - 1] === '..') {
      reject(new errors.ArgumentError('input last does not allow ..'))
    }

    resolve(path.join(input, packageName));
  });
};
