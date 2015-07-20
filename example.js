'use strict';
/*eslint-disable */
var Promise = require('es6-promise').Promise;

var input;
var cwd;
var yoExecutePath;
readPackage({
  input: input,
  cwd: cwd,
  yoExecutePath: yoExecutePath
}).then(function(value){
  //value = {
  // input, cwd, packageName, yoExecutePath
  // };
  prepareTempArea();
}).then(function(value){
  //value = {
  // input, cwd, preparedPath, packageName, yoExecutePath
  // };
  linkGenerator();
}).then(function(value){
  //value = {
  // input, cwd, preparedPath, yoLinkName(packageName), yoExecutePath
  // };
  yo();
}).then(function(value){
  //value = {
  // input, cwd, preparedPath, packageName
  // };
  unlinkGenerator();
}).then(function(value){
  //value = {
  // input, cwd, preparedPath
  // };
  moveToInput();
}).catch(function(error){
  console.error(error);
});
