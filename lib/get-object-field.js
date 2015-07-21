'use strict';
var errors = require('common-errors');
var Promise = require('es6-promise').Promise;

module.exports = function (opts) {
  return new Promise(function (resolve, reject) {
    if (!opts) {
      reject(new errors.ArgumentNullError('opts'));
    }
    ['data', 'field'].forEach(function (value) {
      if(!opts.hasOwnProperty(value) || !opts[value]) {
        reject(new errors.ArgumentNullError(value));
      }
    });
    resolve(opts['data'][opts['field']]);
  });
};
