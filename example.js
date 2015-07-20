'use strict';
/*eslint-disable */
var Promise = require('es6-promise').Promise;

var input;
var cwd;
readJSONField({
  cwd: cwd,
  field: 'name',
  path: './package.json'
}).then(function(value){
  //value = {
  // input, cwd, field {name: data}
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
