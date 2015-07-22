'use strict';
var assert = require('power-assert');
var removeGeneratorPrefix = require('../lib/remove-generator-prefix');
var errors = require('common-errors');

describe('remove generator prefix', function () {
  it('should be removed generator prefix', function () {
    removeGeneratorPrefix('generator-generator-generator', function (err, data) {
      if (err) { throw err; }
      assert.equal(data, 'generator-generator');
    });
  });
  it('should not be valid, empty name', function () {
    removeGeneratorPrefix('generator-', function (err) {
      assert(err instanceof errors.ArgumentError);
    });
  });
  it('should not be valid, prefix exists', function () {
    removeGeneratorPrefix('yo-generator-foo', function (err) {
      assert(err instanceof errors.ArgumentError);
    });
  });
});
