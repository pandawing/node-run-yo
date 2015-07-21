'use strict';
var assert = require('power-assert');
var removeTrailingSeperator = require('../lib/remove-trailing-separator');

describe('remove-trailing-separator', function () {
  it('linux no slash', function () {
    assert.equal(removeTrailingSeperator('/foo/bar/baz'), '/foo/bar/baz');
  });
  it('linux 1 slash', function () {
    assert.equal(removeTrailingSeperator('/foo/bar/baz/'), '/foo/bar/baz');
  });
  it('linux 2 slash', function () {
    assert.equal(removeTrailingSeperator('/foo/bar/baz//'), '/foo/bar/baz');
  });
  it('windows no backslash', function () {
    assert.equal(removeTrailingSeperator('\\foo\\bar\\baz'), '\\foo\\bar\\baz');
  });
  it('windows 1 backslash', function () {
    assert.equal(removeTrailingSeperator('\\foo\\bar\\baz\\'), '\\foo\\bar\\baz');
  });
  it('windows 2 backslash', function () {
    assert.equal(removeTrailingSeperator('\\foo\\bar\\baz\\\\'), '\\foo\\bar\\baz');
  });
});
