# run-yo

[![NPM version][npm-image]][npm-url] [![Travis-CI Status][travis-image]][travis-url] [![Appveyor Status][appveyor-image]][appveyor-url] [![Daviddm Status][daviddm-image]][daviddm-url]

> My spectacular module


## Install

```
$ npm install --save run-yo
```


## Usage

```js
var yoYo = require('run-yo');

yoYo('unicorns');
//=> unicorns & rainbows
```



## CLI

```
$ npm install --global run-yo
```
```
$ run-yo --help

  Usage
    run-yo [input]

  Example
    run-yo
    unicorns & rainbows

    run-yo ponies
    ponies & rainbows

  Options
    --foo  Lorem ipsum. Default: false
```



## API

### yoYo(input, [options])

#### input

*Required*  
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## Changelog

[changelog.md](./changelog.md).


## License

MIT © [sanemat](http://sane.jp)


[travis-url]: https://travis-ci.org/pandawing/node-run-yo
[travis-image]: https://img.shields.io/travis/pandawing/node-run-yo/master.svg?style=flat-square&label=travis
[appveyor-url]: https://ci.appveyor.com/project/sanemat/node-run-yo/branch/master
[appveyor-image]: https://img.shields.io/appveyor/ci/sanemat/node-run-yo/master.svg?style=flat-square&label=appveyor
[npm-url]: https://npmjs.org/package/run-yo
[npm-image]: https://img.shields.io/npm/v/run-yo.svg?style=flat-square
[daviddm-url]: https://david-dm.org/pandawing/node-run-yo
[daviddm-image]: https://img.shields.io/david/pandawing/node-run-yo.svg?style=flat-square
