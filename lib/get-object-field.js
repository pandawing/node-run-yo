'use strict';
var errors = require('common-errors');
var Promise = require('es6-promise').Promise;

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.ArgumentNullError('value'));
      return;
    }
    ['data', 'field'].forEach(function (key) {
      if(!value.hasOwnProperty(key) || !value[key]) {
        reject(new errors.ArgumentNullError(key));
        return;
      }
    });
    resolve(value['data'][value['field']]);
  });
};
