#!/usr/bin/env node
/*eslint no-console:0*/
'use strict';
var meow = require('meow');
var runStable = require('./lib/stable');
var runUnStable = require('./lib/unstable');

var cli = meow({
  help: [
    'Usage',
    '  $ run-yo [input]',
    '',
    'Examples',
    '  $ run-yo',
    '  (run a yo generator to ./example/ )',
    '',
    '  $ run-yo ../path/to/sample',
    '  (run a yo generator to ../path/to/sample/ )',
    '',
    'Options',
    '  --info     Show a log above log level info.    Default: true',
    '  --verbose  Show a log above log level verbose. Default: false',
    '  --debug    Show a log above log level debug.   Default: false'
  ]
},
  {
    default: {
      info: true,
      verbose: false,
      debug: false,
      unstable: false
    }
  }
);

if (cli.flags.unstable) {
  runUnStable(cli.input[0] || 'example', cli.flags);
  return;
}
runStable(cli.input[0] || 'example', cli.flags);
