'use strict';
var Promise = require('es6-promise').Promise;
var lnfs = require('lnfs');
var errors = require('common-errors');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.TypeError('requires value[src], value[dest]'));
      return;
    }
    if(value['src'] === null || value['src'] === '' || value['src'] === '.' || value['src'] === '/') {
      reject(new errors.ArgumentError('input is not allowed: ' + value['src']));
      return;
    }
    if(value['dest'] === null || value['dest'] === '' || value['dest'] === '.' || value['dest'] === '/') {
      reject(new errors.ArgumentError('input is not allowed: ' + value['dest']));
      return;
    }

    lnfs(value['src'], value['dest'], 'dir', function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};
