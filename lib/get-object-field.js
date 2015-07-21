'use strict';
var errors = require('common-errors');
module.exports = function (data, field, cb) {
  if (!data.hasOwnProperty(field)) {
    cb(new errors.NotFoundError(field), null);
  }
  cb(null, data[field]);
};
