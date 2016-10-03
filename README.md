# node-sudiyi [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]


速递易开放平台API

速递易开放平台API是基于文档([速递易开放平台API说明](http://opendoc.sudiyi.cn/api.html) 的Node.js实现。

## Install

```sh
$ npm install --save oizhaolei/node-sudiyi
```


## Usage

```js
var Sudiyi = require('node-sudiyi');
var sudiyi = new Sudiyi({
  partner_id: "_ID_",
  partner_key: "_KEY__"
});

var resvData = {...};
sudiyi.resv(JSON.stringify(resvData)).then(function(data) {
  data = JSON.parse(data);
  ...
});

```


## License

Apache-2.0 © [oizhaolei](oizhaolei.github.io)


[npm-image]: https://badge.fury.io/js/node-sudiyi.svg
[npm-url]: https://npmjs.org/package/node-sudiyi
[travis-image]: https://travis-ci.org/node-weixin/node-sudiyi.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-sudiyi
[daviddm-image]: https://david-dm.org/node-weixin/node-sudiyi.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-sudiyi
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-sudiyi/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-sudiyi
