'use strict';

var logger = require('winston');
var path = require('path');
var readJsonFile = require('./read-json-file');
var getObjectField = require('./get-object-field');
var prettyFormat = require('pretty-format');
var pickTargetPromised = require('./pick-target-promised');

module.exports = function (input, opts) {
  opts = opts || {};
  logger.level = 'debug';

  var cwd = process.cwd();

  pickTargetPromised(input).then(function (value){
    var target = value;
    logger.debug('Target: ' + prettyFormat(target));
    logger.info('Yo-yo is building files to ' + path.normalize(path.join(cwd, input)));
    var targetJsonPath = path.join(cwd, './package.json');
    logger.info('Read ' + targetJsonPath);
    return readJsonFile({
      path: targetJsonPath
    });
  }).then(function (value) {
    var packageData = value;
    logger.debug('packageData: ' + prettyFormat(packageData));
    var field = 'name';
    return getObjectField({
      data: packageData,
      field: field
    });
  }).then(function (value) {
    var packageName = value;
    logger.info('Target generator\'s package name is ' + packageName);
    return 42;
  }).then(function () {
    logger.info('Yo-yo Completed!');
  }).catch(function (error) {
    logger.error(error);
  });
};
