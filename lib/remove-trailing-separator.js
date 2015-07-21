'use strict';
var path = require('path');

module.exports = function (value) {
  return value.replace(/[\\\/]+$/g, '');
};
