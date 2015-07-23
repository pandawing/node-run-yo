'use strict';
var Promise = require('es6-promise').Promise;
var mv = require('mv');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new TypeError('requires value[source], value[dest]'));
      return;
    }
    if ([value['source'], value['dest']].some(function (key) {
        return key === null || key === '' || key === '.' || key === '/';
      })) {
      reject(new ArgumentError('input is not allowed'));
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
