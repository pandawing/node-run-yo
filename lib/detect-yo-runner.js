'use strict';
var Promise = require('es6-promise').Promise;
var fs = require('fs');
var path = require('path');
var pkgName = require('../package.json').name;
var errors = require('common-errors');

module.exports = function () {
  return new Promise(function (resolve, reject) {
    var binYo = path.join('node_modules', '.bin', 'yo');
    var pathYo = path.join('node_modules', 'yo', 'lib', 'cli.js');
    var libBinYo = path.join('node_modules', pkgName, 'node_modules', '.bin', 'yo');
    var libPathYo = path.join('node_modules', pkgName, 'node_modules', 'yo', 'lib', 'cli.js');

    if(isFile(binYo)) {
      resolve(binYo);
      return;
    } else if(isFile(pathYo)) {
      resolve(pathYo);
      return;
    } else if (isFile(libBinYo)) {
      resolve(libBinYo);
      return;
    } else if (isFile(libPathYo)) {
      resolve(libPathYo);
      return;
    }
    reject(new errors.NotFoundError('yo runner not found'));
  });
};

function isFile (path) {
  try {
    var stats = fs.statSync(path);
    return stats.isFile();
  }
  catch (e) {
    return false;
  }
}
