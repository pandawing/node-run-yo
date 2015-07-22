'use strict';

var logger = require('winston');
var path = require('path');
var readJsonFile = require('./read-json-file');
var getObjectField = require('./get-object-field');
var prettyFormat = require('pretty-format');
var pickTargetPromised = require('./pick-target-promised');
var tmpDirPromised = require('./tmp-dir-promised');

module.exports = function (input, opts) {
  opts = opts || {};
  logger.level = 'debug';

  var cwd = process.cwd();

  pickTargetPromised(input).then(function (value){
    var target = value;
    logger.debug('Target:');
    logger.debug(prettyFormat(target));
    logger.info('Yo-yo is building files to:');
    logger.info(path.normalize(path.join(cwd, input)));
    var targetJsonPath = path.join(cwd, './package.json');
    logger.info('Read:');
    logger.info(targetJsonPath);
    return readJsonFile({
      path: targetJsonPath
    });
  }).then(function (value) {
    var packageData = value;
    logger.debug('packageData:');
    logger.debug(prettyFormat(packageData));
    var field = 'name';
    return getObjectField({
      data: packageData,
      field: field
    });
  }).then(function (value) {
    var packageName = value;
    logger.info('Target generator\'s package name:');
    logger.info(packageName);
    return tmpDirPromised({
      unsafeCleanup: true
    });
  }).then(function (value) {
    var dirPath = value['dirPath'];
    logger.info('dirPath');
    logger.info(dirPath);
    var cleanupCallback = value['cleanupCallback'];
    cleanupCallback;
  }).then(function () {
    logger.info('Yo-yo Completed!');
  }).catch(function (error) {
    logger.error(error);
  });
};
