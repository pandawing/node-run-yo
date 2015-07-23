#!/usr/bin/env node
/*eslint no-console:0*/
'use strict';
var meow = require('meow');
var runYo = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ run-yo [input (default: example)]',
    '',
    'Examples',
    '  $ run-yo',
    '  (run the yeoman generator from ./ to ./example/ )',
    '',
    '  $ run-yo ../path/to/sample',
    '  (run the yeoman generator from ./ to ../path/to/sample/ )',
    '',
    'Options',
    '  --stable  RunYo safely, but slowly.           Default: false',
    '  --info    Show a log above log level info.    Default: true',
    '  --verbose Show a log above log level verbose. Default: false',
    '  --debug   Show a log above log level debug.   Default: false'
  ]
},
  {
    default: {
      info: true,
      verbose: false,
      debug: false,
      stable: false
    }
  }
);

if (cli.flags.stable) {
  runYo.stable(cli.input[0] || 'example', cli.flags);
  return;
}
runYo.beta(cli.input[0] || 'example', cli.flags);
