# run-yo

[![NPM version][npm-image]][npm-url] [![Travis-CI Status][travis-image]][travis-url] [![Appveyor Status][appveyor-image]][appveyor-url] [![Daviddm Status][daviddm-image]][daviddm-url]

> Run the developing yeoman generator.

To speed up a development on yeoman generator!  
`run-yo` supports scoped module, like `@sanemat/generator-nm`.  
`run-yo` based on [yeomania](https://github.com/yosuke-furukawa/yeomania).  
For OS X, Linux And Windows.

## Install

```
$ npm install --save run-yo
```


## CLI

```
$ npm install --global run-yo
```
```
$ run-yo --help

  Usage
    run-yo [input]

  Examples
    run-yo
    (run yeoman generator from ./ to ./example/ )

    run-yo ../path/to/sample
    (run yeoman generator from ./ to ../path/to/sample/ )

  Options
    --info     Show a log above log level info.    Default: true
    --verbose  Show a log above log level verbose. Default: false
    --debug    Show a log above log level debug.   Default: false
```



## API

### runYo(input, [options])

#### input

*Required*

Type: `string`

Run to target directory.


#### options

##### info

Type: `boolean`

Default: `true`

Show a log above log level info.

##### verbose

Type: `boolean`

Default: `false`

Show a log above log level verbose.

##### debug

Type: `boolean`

Default: `false`

Show a log above log level debug.


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
