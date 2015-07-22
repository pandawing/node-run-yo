'use strict';
var errors = require('common-errors');
module.exports = function (prefixedGenerator, cb) {
  var matched = prefixedGenerator.match(/^generator-(.+)/);
  if (!matched || !matched[1]) {
    cb(new errors.ArgumentError('not match to generator: ' + prefixedGenerator), null);
    return;
  }
  cb(null, matched[1]);
};
