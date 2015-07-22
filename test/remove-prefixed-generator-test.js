'use strict';
var assert = require('power-assert');
var removePrefixedGenerator = require('../lib/remove-prefixed-generator');
var errors = require('common-errors');

describe('remove prefixed generator', function () {
  it('should be removed generator', function () {
    removePrefixedGenerator('generator-generator-generator', function (err, data) {
      if (err) { throw err; }
      assert.equal(data, 'generator-generator');
    });
  });
  it('should not be valid, empty name', function () {
    removePrefixedGenerator('generator-', function (err) {
      assert(err instanceof errors.ArgumentError);
    });
  });
  it('should not be valid, prefix exists', function () {
    removePrefixedGenerator('yo-generator-foo', function (err) {
      assert(err instanceof errors.ArgumentError);
    });
  });
});
