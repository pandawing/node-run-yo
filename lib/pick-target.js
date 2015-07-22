'use strict';
var type = require('type-detect');
var path = require('path');
var removeTrailingSeparator = require('remove-trailing-path-separator');
var errors = require('common-errors');
var prettyFormat = require('pretty-format');

module.exports = function (input, cb) {
  if (type(input) !== 'string') {
    cb(new errors.TypeError('input requires string'), null);
    return;
  }
  var split = removeTrailingSeparator(path.normalize(input)).split(path.sep);
  var inputLast = split[split.length - 1];
  if (['', '.', '..'].some(function (value) {
      return inputLast === value;
    })) {
    cb(new errors.ArgumentError('input is not allowed: ' + prettyFormat(inputLast)), null);
    return;
  }
  cb(null, inputLast);
};
