'use strict';

var path = require('path');
var readJsonFile = require('./lib/read-json-file');
var getObjectField = require('./lib/get-object-field');

module.exports = function (str, opts) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  opts = opts || {};

  var cwd = process.cwd();
  var targetJsonPath = path.join(cwd, './package.json');
  readJsonFile({
    path: targetJsonPath
  }).then(function (value) {
    var packageData = value['data'];
    var field = 'name';
    return getObjectField({
      data: packageData,
      field: field
    });
  }).then(function (value) {
    value;
    //var packageName = value;
  }).catch(function (error) {
    console.error(error);// eslint-disable-line no-console
  });
  return str + ' & ' + (opts.postfix || 'rainbows');
};
