'use strict';

var path = require('path');
var readJsonFile = require('./lib/read-json-file');

module.exports = function (str, opts) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }

  opts = opts || {};

  var targetJsonPath = path.join(process.cwd(), './package.json');
  readJsonFile({
    path: targetJsonPath
  }).then(function (value) {
    // var normalizedJsonPath = value['path'];
    var data = value['data'];
    var packageName = data['name'];
    console.log('packageName: ' + packageName);// eslint-disable-line no-console
  }).catch(function (error) {
    console.error(error);// eslint-disable-line no-console
  });
  return str + ' & ' + (opts.postfix || 'rainbows');
};
