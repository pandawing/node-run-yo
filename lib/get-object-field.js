'use strict';
var errors = require('common-errors');
var Promise = require('es6-promise').Promise;

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.ArgumentNullError('value'));
      return;
    }
    if(!value.hasOwnProperty('data') || !value['data']) {
      reject(new errors.ArgumentNullError('data'));
      return;
    }
    if(!value.hasOwnProperty('field') || !value['field']) {
      reject(new errors.ArgumentNullError('field'));
      return;
    }
    resolve(value['data'][value['field']]);
  });
};
