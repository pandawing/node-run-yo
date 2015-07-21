'use strict';
var errors = require('common-errors');
var Promise = require('es6-promise').Promise;
var path = require('path');
var removeTrailingSlash = require('./remove-trailing-separator');
var tmp = require('tmp');
var mkdirp = require('mkdirp');

module.exports = function (value) {
  return new Promise(function (resolve) {
    if (!value) {
      throw new errors.ArgumentNullError('value');
    }
    ['dir'].forEach(function (key) {
      if(!value.hasOwnProperty(key) || !value[key]) {
        throw new errors.ArgumentNullError(key);
      }
    });

    var targetDir = removeTrailingSlash(path.normalize(value['dir']));
    if (targetDir.split(path.sep).indexOf('..') !== -1) {
      throw new errors.ArgumentError('dir has .. directory');
    }

    tmp.setGracefulCleanup();

    tmp.dir({ keep: true, unsafeCleanup: true }, function (err, dirPath, cleanupCallback) {
      if (err) { throw new errors.Error('tmp.dir', err); }
      var clearMethod = cleanupCallback;
      var targetpath = path.join(dirPath, targetDir);
      mkdirp(targetpath, function (err) {
        if (err) {
          clearMethod();
          throw new errors.Error('mkdirp', err);
        }
        resolve({
          path: targetpath,
          clearMethod: clearMethod
        });
      });
    });
  });
};