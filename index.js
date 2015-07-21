'use strict';

var path = require('path');
var readJsonFile = require('./lib/read-json-file');
var getObjectField = require('./lib/get-object-field');
var appCompileDir = require('./lib/app-compile-dir');
var mkdirInTemp = require('./lib/mkdir-in-temp');
var type = require('type-detect');

module.exports = function (input, opts) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  opts = opts || {};

  var cwd = process.cwd();
  var targetJsonPath = path.join(cwd, './package.json');
  var linked = false;
  var clearMethod;
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
    var appCompileParentDir = path.dirname(appCompileDir);
    return mkdirInTemp({
      dir: appCompileParentDir
    });
  }).then(function (value) {
    //var madeTempDir = value['path'];
    clearMethod = value['clearMethod'];
    console.log(value);// eslint-disable-line no-console
    return 42;
  }).then(function () {
    if (!linked && type(clearMethod) === 'function') {
      clearMethod();
      console.log('cleaned up');// eslint-disable-line no-console
    }
  }).catch(function (error) {
    if (!linked && type(clearMethod) === 'function') {
      clearMethod();
      console.log('cleaned up');// eslint-disable-line no-console
    }
    console.error(error);// eslint-disable-line no-console
  });
  return input + ' & ' + (opts.postfix || 'rainbows');
};
