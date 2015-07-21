'use strict';
module.exports = function (value) {
  return value.replace(/[\\\/]+$/g, '');
};
