'use strict';
var assert = require('power-assert');
var shouldRejected = require('promise-test-helper').shouldRejected;
var shouldFulfilled = require('promise-test-helper').shouldFulfilled;
var mkdirInTemp = require('../lib/mkdir-in-temp');
var errors = require('common-errors');
var path = require('path');

describe('mkdir in temp', function () {
  it('should be rejected, value is required', function () {
    return shouldRejected(mkdirInTemp()).catch(function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });

  it('should be rejected, dir is required', function () {
    var params = { dir: null };
    return shouldRejected(mkdirInTemp(params)).catch(function (error) {
      assert(error instanceof errors.ArgumentNullError);
    });
  });
  it('should be rejected, dir has .. directory', function () {
    var params = { dir: '../baz' };
    return shouldRejected(mkdirInTemp(params)).catch(function (error) {
      assert(error instanceof errors.ArgumentError);
    });
  });
  it('should be fulfilled', function () {
    var params = { dir: 'foo/bar' };
    var sliced = path.sep + 'foo' + path.sep + 'bar';
    return shouldFulfilled(mkdirInTemp(params)).then(function (value) {
      value['clearMethod']();
      assert.equal(value['path'].slice(-8), sliced);
    });
  });
  it('should be fulfilled, included ..', function () {
    var params = { dir: 'foo/../bar' };
    var sliced = path.sep + 'bar';
    return shouldFulfilled(mkdirInTemp(params)).then(function (value) {
      value['clearMethod']();
      assert.equal(value['path'].slice(-4), sliced);
    });
  });
});
