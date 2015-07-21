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
    // var normalizedJsonPath = value['path'];
    getObjectField(value['data'], 'name', function(err, data) {
      if (err) { throw err; }
      var packageName = data;
    });
    console.log('packageName: ' + packageName);// eslint-disable-line no-console
  }).catch(function (error) {
    console.error(error);// eslint-disable-line no-console
  });
  return str + ' & ' + (opts.postfix || 'rainbows');
};
