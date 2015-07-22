'use strict';
/*eslint no-console:0*/

var path = require('path');
var readJsonFile = require('./lib/read-json-file');
var getObjectField = require('./lib/get-object-field');
//var type = require('type-detect');

module.exports = function (input, opts) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  opts = opts || {};

  var cwd = process.cwd();
  console.log('Yo-yo will build files to ' + path.normalize(path.join(cwd, input)));
  var targetJsonPath = path.join(cwd, './package.json');
  console.log('Read ' + targetJsonPath);
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
    console.log('Target generator\'s package name is ' + packageName);
    return 42;
  }).then(function () {
    console.log('Yo-yo! Completed.');
  }).catch(function (error) {
    console.error(error);
  });
};
