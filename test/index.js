'use strict';
var assert = require('assert');

const Sudiyi = require('../lib/index.js');
var sudiyi = new Sudiyi({
  partner_id: process.env.PARTNER_ID,
  partner_key: process.env.PARTNER_KEY,

});

describe('module', function () {

  it('should be able to create a temporary qrcode', function (done) {
    sudiyi.boxStatus(1006865).then(function (data) {
      console.log(data);
      done();
    });
  });

});
