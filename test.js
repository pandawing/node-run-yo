'use strict';
var assert = require('power-assert');
var yoYo = require('./');

it('should ', function () {
  assert.strictEqual(yoYo('unicorns'), 'unicorns & rainbows');
});
it('should not ', function () {
  assert.strictEqual(yoYo('unicorns'), 'unicorns & wrong');
});
