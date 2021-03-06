'use strict';
var Promise = require('es6-promise').Promise;
var mv = require('mv');
var errors = require('common-errors');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.TypeError('requires value[source], value[dest]'));
      return;
    }
    // FIXME
    if ([value['source'], value['dest']].some(function (key) {
      return key === null || key === '' || key === '.' || key === '/';
    })) {
      reject(new errors.ArgumentError('input is not allowed'));
      return;
    }

    mv(value['source'], value['dest'], { mkdirp: true }, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
