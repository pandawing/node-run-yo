'use strict';
var assert = require('power-assert');
var shouldRejected = require('promise-test-helper').shouldRejected;
//var shouldFulfilled = require('promise-test-helper').shouldFulfilled;
var appCompileDir = require('../lib/app-compile-dir');
var errors = require('common-errors');
//var path = require('path');
var objectAssign = require('object-assign');

it('should be rejected, value is required', function () {
  return shouldRejected(appCompileDir({})).catch(function (error) {
    assert(error instanceof errors.ArgumentError);
  });
});

var validParams = {
  input: 'new-type',
  packageName: 'your-package'
};

it('should be rejected, input is required', function () {
  var params = objectAssign({}, validParams, { input: null });
  return shouldRejected(appCompileDir(params)).catch(function (error) {
    assert(error instanceof errors.ArgumentNullError);
  });
});
it('should be rejected, packageName is required', function () {
  var params = objectAssign({}, validParams, { packageName: null });
  return shouldRejected(appCompileDir(params)).catch(function (error) {
    assert(error instanceof errors.ArgumentNullError);
  });
});
it('should be rejected, packageName is invalid', function () {
  var params = objectAssign({}, validParams, { packageName: '/example' });
  return shouldRejected(appCompileDir(params)).catch(function (error) {
    assert(error instanceof errors.ArgumentError);
  });
});
