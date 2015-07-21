'use strict';
var assert = require('power-assert');
var shouldRejected = require('promise-test-helper').shouldRejected;
var shouldFulfilled = require('promise-test-helper').shouldFulfilled;
var appCompileDir = require('../lib/app-compile-dir');
var errors = require('common-errors');
var path = require('path');
var objectAssign = require('object-assign');

describe('app compile dir', function () {
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
  it('should be rejected, no parent for target dir', function () {
    var params = objectAssign({}, validParams, { input: '..' });
    return shouldRejected(appCompileDir(params)).catch(function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should be rejected, no root for target dir', function () {
    var params = objectAssign({}, validParams, { input: '/' });
    return shouldRejected(appCompileDir(params)).catch(function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should be rejected, no current for target dir', function () {
    var params = objectAssign({}, validParams, { input: '.' });
    return shouldRejected(appCompileDir(params)).catch(function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should be fulfilled, normal package', function () {
    var params = { input: 'you', packageName: 'generator-nm' };
    var expected = path.normalize('you/generator-nm');
    return shouldFulfilled(appCompileDir(params)).then(function (value) {
      assert.equal(value, expected);
    });
  });
  it('should be fulfilled, scoped package', function () {
    var params = { input: 'you', packageName: '@sanemat/generator-nm' };
    var expected = path.normalize('you/@sanemat/generator-nm');
    return shouldFulfilled(appCompileDir(params)).then(function (value) {
      assert.equal(value, expected);
    });
  });
  it('should be fulfilled, without trailing separator', function () {
    var params = { input: 'you/', packageName: 'generator-nm' };
    var expected = path.normalize('you/generator-nm');
    return shouldFulfilled(appCompileDir(params)).then(function (value) {
      assert.equal(value, expected);
    });
  });
  it('should be fulfilled, with nested input directory', function () {
    var params = { input: 'you/know', packageName: 'generator-nm' };
    var expected = path.normalize('know/generator-nm');
    return shouldFulfilled(appCompileDir(params)).then(function (value) {
      assert.equal(value, expected);
    });
  });
  it('should be fulfilled, included parent directory', function () {
    var params = { input: '../../you/know', packageName: 'generator-nm' };
    var expected = path.normalize('know/generator-nm');
    return shouldFulfilled(appCompileDir(params)).then(function (value) {
      assert.equal(value, expected);
    });
  });
  it('should be fulfilled, with full path input directory', function () {
    var params = { input: '/you/know', packageName: 'generator-nm' };
    var expected = path.normalize('know/generator-nm');
    return shouldFulfilled(appCompileDir(params)).then(function (value) {
      assert.equal(value, expected);
    });
  });
});
