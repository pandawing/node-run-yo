'use strict';
var Promise = require('es6-promise').Promise;
var mkdirp = require('mkdirp');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new TypeError('requires value'));
      return;
    }
    mkdirp(value, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
