#!/usr/bin/env node
/*eslint no-console:0*/
'use strict';
var meow = require('meow');
var yoYo = require('./lib/stable');

var cli = meow({
  help: [
    'Usage',
    '  $ run-yo [input]',
    '',
    'Examples',
    '  $ run-yo',
    '  unicorns & rainbows',
    '',
    '  $ run-yo ponies',
    '  ponies & rainbows',
    '',
    'Options',
    '  --foo  Lorem ipsum. Default: false'
  ]
},
  {
    default: {
      info: true,
      verbose: false,
      debug: false
    }
  }
);

yoYo(cli.input[0] || 'example', cli.flags);
