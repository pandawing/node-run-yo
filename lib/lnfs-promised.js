'use strict';
var Promise = require('es6-promise').Promise;
var lnfs = require('lnfs');
var errors = require('common-errors');

module.exports = function (value) {
  if (!value) {
    return Promise.reject(new errors.TypeError('requires value[src], value[dest]'));
  }
  if(value['src'] === null || value['src'] === '' || value['src'] === '.' || value['src'] === '/') {
    return Promise.reject(new errors.ArgumentError('input is not allowed: ' + value['src']));
  }
  if(value['dest'] === null || value['dest'] === '' || value['dest'] === '.' || value['dest'] === '/') {
    return Promise.reject(new errors.ArgumentError('input is not allowed: ' + value['dest']));
  }
  return lnfs(value['src'], value['dest']);
};
