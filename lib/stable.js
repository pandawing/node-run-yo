'use strict';

var logger = require('winston');
var path = require('path');
var readJsonFile = require('./read-json-file');
var getObjectField = require('./get-object-field');
var prettyFormat = require('pretty-format');
var pickTargetPromised = require('./pick-target-promised');
var tmpDirPromised = require('./tmp-dir-promised');
var spawnSync = require('./spawn-sync');
var generatorName = require('./generator-name');
var mkdirpPromised = require('./mkdirp-promised');

module.exports = function (input, opts) {
  opts = opts || {};

  if(opts.debug) {
    logger.level = 'debug';
  } else if (opts.verbose) {
    logger.level = 'verbose';
  } else if (opts.info) {
    logger.level = 'info';
  }

  var cwd = process.cwd();// /Users/sane/work/js-study/generator-nm
  var target;// example
  var packageName;// @sanemat/generator-nm
  var tempBasePath;// /var/folders/zk/y7bt0p5x67gg39k56bc7ykx00000gn/T/tmp-44580wbp356N5EY9J
  var yoTarget;// @sanemat/nm
  var tempRunPath;// /var/folders/zk/y7bt0p5x67gg39k56bc7ykx00000gn/T/tmp-44580wbp356N5EY9J/example
  pickTargetPromised(input).then(function (value){
    target = value;
    logger.debug('Target:');
    logger.debug(prettyFormat(target));
    logger.info('Run-yo is building files to:');
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
    return generatorName(packageName);
  }).then(function (value) {
    yoTarget = value;
    logger.info('Yo target:');
    logger.info(yoTarget);
    return tmpDirPromised({
      unsafeCleanup: true
    });
  }).then(function (value) {
    tempBasePath = value['dirPath'];
    logger.info('tempDirPath');
    logger.info(tempBasePath);
    //cleanupCallback = value['cleanupCallback'];
    tempRunPath = path.join(tempBasePath, target);
    logger.info('tempRunPath');
    logger.info(tempRunPath);
    return mkdirpPromised(tempRunPath);
  }).then(function () {
    var npmInstall = ['npm', ['install', cwd], { stdio: 'inherit', cwd: tempRunPath }];
    logger.info(npmInstall);
    return spawnSync(npmInstall);
  }).then(function (value) {
    logger.debug(prettyFormat(value));
    logger.verbose('error:');
    logger.verbose(prettyFormat(value['error']));
    logger.verbose('status:');
    logger.verbose(prettyFormat(value['status']));
    var yoBin = path.join(cwd, 'node_modules', '.bin', 'yo');
    var yoExec = [yoBin, [yoTarget], { stdio: 'inherit', cwd: tempRunPath }];
    logger.info(yoExec);
    return spawnSync(yoExec);
  }).then(function (value) {
    logger.debug(value);
    return 42;
  }).then(function () {
    logger.info('Run-yo Completed!');
  }).catch(function (error) {
    logger.error(error);
  });
};
