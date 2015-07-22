'use strict';
var assert = require('power-assert');
var pickTarget = require('../lib/pick-target');
var errors = require('common-errors');

describe('pick target', function () {
  it('should not be allowed null', function () {
    pickTarget(null, function (error) {
      assert(error instanceof errors.TypeError);
    });
  });
  it('should not be allowed (empty)', function () {
    pickTarget('', function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should not be allowed "."', function () {
    pickTarget('.', function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should not be allowed ".."', function () {
    pickTarget('..', function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should not be allowed "example/.."', function () {
    pickTarget('example/..', function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should be allowed example', function () {
    pickTarget('example', function (error, data) {
      if (error) { throw error; }
      assert.equal(data, 'example');
    });
  });
  it('should be allowed ./example', function () {
    pickTarget('./example', function (error, data) {
      if (error) { throw error; }
      assert.equal(data, 'example');
    });
  });
  it('should be allowed /example', function () {
    pickTarget('/example', function (error, data) {
      if (error) { throw error; }
      assert.equal(data, 'example');
    });
  });
  it('should be allowed ../example', function () {
    pickTarget('../example', function (error, data) {
      if (error) { throw error; }
      assert.equal(data, 'example');
    });
  });
  it('should be allowed example/', function () {
    pickTarget('example/', function (error, data) {
      if (error) { throw error; }
      assert.equal(data, 'example');
    });
  });
  it('should be allowed example/.', function () {
    pickTarget('example/.', function (error, data) {
      if (error) { throw error; }
      assert.equal(data, 'example');
    });
  });
  it('should be allowed foo/example', function () {
    pickTarget('foo/example', function (error, data) {
      if (error) { throw error; }
      assert.equal(data, 'example');
    });
  });
});
