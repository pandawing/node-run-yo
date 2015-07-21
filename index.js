'use strict';
/*eslint no-console:0*/

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
  console.log('Yo-yo!');
  console.log('Yo-yo will create files to ' + path.normalize(path.join(cwd, input)));
  var targetJsonPath = path.join(cwd, './package.json');
  console.log('Read ' + targetJsonPath);
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
    console.log('Target package name is ' + packageName);
    return appCompileDir({
      input: input,
      packageName: packageName
    });
  }).then(function (value) {
    var appCompileDir = value;
    console.log('Target compile directory is ' + appCompileDir);
    var appCompileParentDir = path.dirname(appCompileDir);
    return mkdirInTemp({
      dir: appCompileParentDir
    });
  }).then(function (value) {
    var madeTempDir = value['path'];
    clearMethod = value['clearMethod'];
    console.log('Prepare temp directory to ' + madeTempDir);
    return 42;
  }).then(function () {
    if (!linked && type(clearMethod) === 'function') {
      clearMethod();
      console.log('cleaned up temp directory');
    }
    console.log('Yo-yo! Completed.');
  }).catch(function (error) {
    if (!linked && type(clearMethod) === 'function') {
      clearMethod();
      console.log('cleaned up temp directory');
    }
    console.error(error);
  });
};
