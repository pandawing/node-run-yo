'use strict';
var Promise = require('es6-promise').Promise;
var tmp = require('tmp');
var errors = require('common-errors');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    tmp.setGracefulCleanup();
    tmp.dir(value, function (err, dirPath, cleanupCallback) {
      if (err) {
        reject(new errors.Error('tmp.dir', err));
        return;
      }
      resolve({
        dirPath: dirPath,
        cleanupCallback: cleanupCallback
      });
    });
  });
};
