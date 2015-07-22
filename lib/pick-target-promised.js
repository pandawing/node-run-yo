'use strict';
var Promise = require('es6-promise').Promise;
var pickTarget = require('./pick-target');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    pickTarget(value, function(err, data) {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};
