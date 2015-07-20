'use strict';
var assert = require('power-assert');
var shouldRejected = require('promise-test-helper').shouldRejected;
var shouldFulfilled = require('promise-test-helper').shouldFulfilled;
var readJsonFile = require('../lib/read-json-file');
var errors = require('common-errors');
var path = require('path');

it('should be rejected, path is required', function () {
  var params = { path: null };
  return shouldRejected(readJsonFile(params)).catch(function (error) {
    assert(error instanceof errors.ArgumentNullError);
  });
});
it('should be rejected, opt is required', function () {
  return shouldRejected(readJsonFile()).catch(function (error) {
    assert(error instanceof errors.ArgumentNullError);
  });
});
it('should be rejected, file load error', function () {
  var params = { path: './test/fixtures/not-found.json' };
  return shouldRejected(readJsonFile(params)).catch(function (error) {
    assert(error instanceof errors.io.FileLoadError);
  });
});
it('should be fulfilled, relative path', function () {
  var params = { path: './test/fixtures/target.json' };
  var expectedData = require(path.join(process.cwd(), './test/fixtures/target.json'));
  return shouldFulfilled(readJsonFile(params)).then(function (value) {
    var expected = {
      path: path.normalize('test/fixtures/target.json'),
      data: expectedData
    };
    assert.deepEqual(value, expected);
  });
});
it('should be fulfilled, absolute path', function () {
  var params = { path: path.join(process.cwd(), './test/fixtures/target.json') };
  var expectedData = require(path.join(process.cwd(), './test/fixtures/target.json'));
  return shouldFulfilled(readJsonFile(params)).then(function (value) {
    var expected = {
      path: path.join(process.cwd(), './test/fixtures/target.json'),
      data: expectedData
    };
    assert.deepEqual(value, expected);
  });
});
