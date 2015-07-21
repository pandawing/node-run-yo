'use strict';
var errors = require('common-errors');
var Promise = require('es6-promise').Promise;
var path = require('path');
var removeTrailingSlash = require('remove-trailing-path-separator');
var tmp = require('tmp');
var mkdirp = require('mkdirp');

module.exports = function (value) {
  return new Promise(function (resolve, reject) {
    if (!value) {
      reject(new errors.ArgumentNullError('value'));
      return;
    }
    ['dir'].forEach(function (key) {
      if(!value.hasOwnProperty(key) || !value[key]) {
        reject(new errors.ArgumentNullError(key));
        return;
      }
    });

    var targetDir = removeTrailingSlash(path.normalize(value['dir']));
    if (targetDir.split(path.sep).indexOf('..') !== -1) {
      reject(new errors.ArgumentError('dir has .. directory'));
      return;
    }

    tmp.setGracefulCleanup();

    tmp.dir({ keep: true, unsafeCleanup: true }, function (err, dirPath, cleanupCallback) {
      if (err) {
        reject(new errors.Error('tmp.dir', err));
        return;
      }

      var clearMethod = cleanupCallback;
      var targetPath = path.join(dirPath, targetDir);
      mkdirp(targetPath, function (err) {
        if (err) {
          reject(new errors.Error('mkdirp', err));
          clearMethod();
          return;
        }
        resolve({
          path: targetPath,
          clearMethod: clearMethod
        });
      });
    });
  });
};
