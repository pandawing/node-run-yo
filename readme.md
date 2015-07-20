# yo-yo

[![NPM version][npm-image]][npm-url] [![Travis-CI Status][travis-image]][travis-url] [![Appveyor Status][appveyor-image]][appveyor-url] [![Daviddm Status][daviddm-image]][daviddm-url]

> My spectacular module


## Install

```
$ npm install --save yo-yo
```


## Usage

```js
var yoYo = require('yo-yo');

yoYo('unicorns');
//=> unicorns & rainbows
```



## CLI

```
$ npm install --global yo-yo
```
```
$ yo-yo --help

  Usage
    yo-yo [input]

  Example
    yo-yo
    unicorns & rainbows

    yo-yo ponies
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


[travis-url]: https://travis-ci.org/pandawing/node-yo-yo
[travis-image]: https://img.shields.io/travis/pandawing/node-yo-yo/master.svg?style=flat-square&label=travis
[appveyor-url]: https://ci.appveyor.com/project/sanemat/node-yo-yo/branch/master
[appveyor-image]: https://img.shields.io/appveyor/ci/sanemat/node-yo-yo/master.svg?style=flat-square&label=appveyor
[npm-url]: https://npmjs.org/package/yo-yo
[npm-image]: https://img.shields.io/npm/v/yo-yo.svg?style=flat-square
[daviddm-url]: https://david-dm.org/pandawing/node-yo-yo
[daviddm-image]: https://img.shields.io/david/pandawing/node-yo-yo.svg?style=flat-square
