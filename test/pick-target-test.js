'use strict';
var assert = require('power-assert');
var pickTarget = require('../lib/pick-target');
var errors = require('common-errors');

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
