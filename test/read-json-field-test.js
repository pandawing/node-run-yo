'use strict';
var assert = require('power-assert');
var shouldRejected = require('promise-test-helper').shouldRejected;
var readJsonField = require('../lib/read-json-field');
var objectAssign = require('object-assign');
var errors = require('common-errors');

var validParams = {
  input: 'example',
  cwd: process.cwd(),
  field: 'description',
  path: 'test/fixtures/target.json'
};

it('should be rejected, cwd is required', function () {
  var params = objectAssign({}, validParams, { cwd: null });
  return shouldRejected(readJsonField(params)).catch(function (error) {
    assert(error instanceof errors.ArgumentNullError);
  });
});
it('should be rejected, field is required', function () {
  var params = objectAssign({}, validParams, { field: null });
  return shouldRejected(readJsonField(params)).catch(function (error) {
    assert(error instanceof errors.ArgumentNullError);
  });
});
it('should be rejected, path is required', function () {
  var params = objectAssign({}, validParams, { path: null });
  return shouldRejected(readJsonField(params)).catch(function (error) {
    assert(error instanceof errors.ArgumentNullError);
  });
});
it('should be rejected, opt is required', function () {
  return shouldRejected(readJsonField()).catch(function (error) {
    assert(error instanceof errors.ArgumentNullError);
  });
});
it('should be rejected, module not found', function () {
  var params = objectAssign({}, validParams, { path: './test/fixtures/not-found.json' });
  return shouldRejected(readJsonField(params)).catch(function (error) {
    assert(error instanceof errors.io.FileNotFoundError);
  });
});
