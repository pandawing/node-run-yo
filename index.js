'use strict';

var path = require('path');
var readJsonFile = require('./lib/read-json-file');
var getObjectField = require('./lib/get-object-field');
var appCompileDir = require('./lib/app-compile-dir');

module.exports = function (input, opts) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  opts = opts || {};

  var cwd = process.cwd();
  var targetJsonPath = path.join(cwd, './package.json');
  readJsonFile({
    path: targetJsonPath
  }).then(function (value) {
    var packageData = value;
    var field = 'name';
    return getObjectField({
      data: packageData,
      field: field
    });
  }).then(function (value) {
    var packageName = value;
    return appCompileDir({
      input: input,
      packageName: packageName
    });
  }).then(function (value) {
    var appCompileDir = value;
    console.log(appCompileDir);
  }).catch(function (error) {
    console.error(error);// eslint-disable-line no-console
  });
  return input + ' & ' + (opts.postfix || 'rainbows');
};
