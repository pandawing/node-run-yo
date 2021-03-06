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
var rimrafPromised = require('./rimraf-promised');
var removeTrailingPathSeparator = require('remove-trailing-path-separator');
var mvPromised = require('./mv-promised');
var detectYoRunner = require('./detect-yo-runner');
var lnfsPromised = require('./lnfs-promised');
var nodetree = require('nodetree');
var rimraf = require('rimraf');

module.exports = function (input, opts) {
  opts = opts || {};

  if(opts.debug) {
    logger.level = 'debug';
  } else if (opts.verbose) {
    logger.level = 'verbose';
  } else if (opts.info) {
    logger.level = 'info';
  }

  logger.info('THIS IS A BETA VERSION!!!');

  // input;// path/to/example
  var cwd = process.cwd();// /Users/sane/work/js-study/generator-nm
  var destPath = path.normalize(path.join(cwd, removeTrailingPathSeparator(input)));
  // destPath;// /Users/sane/work/js-study/generator-nm/path/to/example
  var target;// example
  var packageName;// @sanemat/generator-nm
  var tempBasePath;// /var/folders/zk/y7bt0p5x67gg39k56bc7ykx00000gn/T/tmp-44580wbp356N5EY9J
  var yoTarget;// @sanemat/nm
  var tempRunPath;// /var/folders/zk/y7bt0p5x67gg39k56bc7ykx00000gn/T/tmp-44580wbp356N5EY9J/example
  var linking = false;
  var linkPath;// /var/folders/zk/y7bt0p5x67gg39k56bc7ykx00000gn/T/tmp-44580wbp356N5EY9J/example/node_module/@sanemat/generator-nm
  var linkParentPath;// /var/folders/zk/y7bt0p5x67gg39k56bc7ykx00000gn/T/tmp-44580wbp356N5EY9J/example/node_module/@sanemat

  pickTargetPromised(input).then(function (value){
    target = value;
    logger.debug('Target:');
    logger.debug(prettyFormat(target));
    logger.info('Run-yo is building files to:');
    logger.info(destPath);
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
    linkPath = path.join(tempRunPath, 'node_modules', packageName);
    linkParentPath = path.dirname(linkPath);
    return mkdirpPromised(linkParentPath);
  }).then(function () {
    return lnfsPromised({
      src: cwd,
      dest: linkPath
    });
  }).then(function () {
    linking = true;
    logger.info('link from: ' + linkPath + ' to: ' + cwd);
    logger.debug('directory tree: ' + linkParentPath);
    logger.debug(nodetree(linkParentPath, { level: 2 }));
    return detectYoRunner();
  }).then(function (value) {
    logger.debug(value);
    var yoRunner = path.join(cwd, value);
    var yoExec = [yoRunner, [yoTarget], { stdio: 'inherit', cwd: tempRunPath }];
    logger.info(yoExec);
    return spawnSync(yoExec);
  }).then(function (value) {
    logger.debug(prettyFormat(value));
    return rimrafPromised(linkPath);
  }).then(function () {
    linking = false;
    logger.info('unlink from: ' + linkPath + ' to: ' + cwd);
    logger.debug('directory tree: ' + linkParentPath);
    logger.debug(nodetree(linkParentPath, { level: 2 }));
    return rimrafPromised(destPath);
  }).then(function () {
    return mvPromised({
      source: tempRunPath,
      dest: destPath
    });
  }).then(function () {
    logger.info('Run-yo Completed!');
  }).catch(function (error) {
    if (linking) {
      rimraf.sync(linkPath);
      linking = false;
      logger.info('unlink from: ' + linkPath + ' to: ' + cwd);
      logger.debug('directory tree: ' + linkParentPath);
      logger.debug(nodetree(linkParentPath, { level: 2 }));
    }
    logger.error(error);
  });
};
