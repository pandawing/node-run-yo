'use strict';
var Promise = require('es6-promise').Promise;
var rimraf = require('rimraf');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    rimraf(value, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
