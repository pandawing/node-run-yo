'use strict';
var assert = require('power-assert');
var shouldRejected = require('promise-test-helper').shouldRejected;
var readJsonField = require('../lib/read-json-field');
var objectAssign = require('object-assign');
var AppError = require('../lib/app-error');

var validParams = {
  input: 'example',
  cwd: process.cwd,
  field: 'description',
  path: 'test/fixtures/target.json'
};

it('should be fail, cwd is required', function () {
  var params = objectAssign(validParams, { cwd: null });
  return shouldRejected(readJsonField(params)).catch(function (error) {
    assert(error instanceof AppError);
  });
});
