'use strict';
/*eslint-disable */
var Promise = require('es6-promise').Promise;

var input;
var cwd;
readJSONField({
  input: input,
  cwd: cwd,
  field: 'name',
  file: 'package.json'
}).then(function(value){
  //value = {
  // input, cwd, packageName
  // };
  prepareTempArea();
}).then(function(value){
  //value = {
  // input, cwd, preparedPath, packageName
  // };
  linkGenerator();
}).then(function(value){
  //value = {
  // input, cwd, preparedPath, yoLinkName(packageName)
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
