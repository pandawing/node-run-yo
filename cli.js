#!/usr/bin/env node
/*eslint no-console:0*/
'use strict';
var meow = require('meow');
var yoYo = require('./index');

var cli = meow({
  help: [
    'Usage',
    '  $ yo-yo [input]',
    '',
    'Examples',
    '  $ yo-yo',
    '  unicorns & rainbows',
    '',
    '  $ yo-yo ponies',
    '  ponies & rainbows',
    '',
    'Options',
    '  --foo  Lorem ipsum. Default: false'
  ]
});

console.log(yoYo(cli.input[0] || 'unicorns'));
