'use strict';
var errors = require('common-errors');
var Promise = require('es6-promise').Promise;
var isPackage = require('is-package');
var path = require('path');
var removeTrailingSeparator = require('remove-trailing-path-separator');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.ArgumentNullError('value'));
      return;
    }
    ['input', 'packageName'].forEach(function (key) {
      if(!value.hasOwnProperty(key) || !value[key]) {
        reject(new errors.ArgumentNullError(key));
        return;
      }
    });
    var packageName = value['packageName'];
    var input = removeTrailingSeparator(value['input']);
    if (!isPackage(packageName)) {
      reject(new errors.ArgumentError(packageName + 'is not package'));
      return;
    }
    var split = path.normalize(input).split(path.sep);
    var inputLast = split[split.length - 1];
    if (inputLast === '..' || inputLast == '' || inputLast == '.') {
      reject(new errors.ArgumentError('input last does not allow (empty), .., .'));
      return;
    }

    resolve(path.join(inputLast, packageName));
  });
};
