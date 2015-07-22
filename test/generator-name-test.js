'use strict';
var assert = require('power-assert');
var shouldRejected = require('promise-test-helper').shouldRejected;
var shouldFulfilled = require('promise-test-helper').shouldFulfilled;
var generatorName = require('../lib/generator-name');
var errors = require('common-errors');

describe('generator name', function () {
  it('should be rejected, input must be string', function () {
    return shouldRejected(generatorName()).catch(function (error) {
      assert(error instanceof errors.TypeError);
    });
  });
  it('should be rejected, generator must be package', function () {
    return shouldRejected(generatorName('foo/you/are')).catch(function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should be rejected, scoped package but not generator', function () {
    return shouldRejected(generatorName('@example/example')).catch(function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should be fulfilled, scoped package', function () {
    return shouldFulfilled(generatorName('@example/generator-example')).then(function (value) {
      assert(value, '@example/example');
    });
  });
  it('should be rejected, normal package but not generator', function () {
    return shouldRejected(generatorName('example')).catch(function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should be fulfilled, normal package', function () {
    return shouldFulfilled(generatorName('generator-example')).then(function (value) {
      assert(value, 'example');
    });
  });
});
