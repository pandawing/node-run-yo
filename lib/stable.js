'use strict';

var logger = require('winston');
var path = require('path');
var readJsonFile = require('./read-json-file');
var getObjectField = require('./get-object-field');
var prettyFormat = require('pretty-format');
var pickTargetPromised = require('./pick-target-promised');
var tmpDirPromised = require('./tmp-dir-promised');
var spawnSync = require('./spawn-sync');

module.exports = function (input, opts) {
  opts = opts || {};
  logger.level = 'debug';

  var cwd = process.cwd();
  var target;
  var packageName;
  var dirPath;
  pickTargetPromised(input).then(function (value){
    target = value;
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
    packageName = value;
    logger.info('Target generator\'s package name:');
    logger.info(packageName);
    return tmpDirPromised({
      unsafeCleanup: true
    });
  }).then(function (value) {
    dirPath = value['dirPath'];
    logger.info('dirPath');
    logger.info(dirPath);
    //cleanupCallback = value['cleanupCallback'];
    return spawnSync(['npm', ['install', cwd], { stdio: 'inherit', cwd: dirPath }]);
  }).then(function (value) {
    logger.debug(prettyFormat(value));
    logger.info('error:');
    logger.info(prettyFormat(value['error']));
    logger.info('status:');
    logger.info(prettyFormat(value['status']));
  }).then(function () {
    logger.info('Yo-yo Completed!');
  }).catch(function (error) {
    logger.error(error);
  });
};
