"use strict";
//速递易开放平台API

var crypto = require('crypto');
var curl = require('curlrequest');
var moment = require("moment");

var url = 'http://open.sudiyi.cn';
//
var Sudiyi = function(conf) {
  this.conf = conf;
};

//生成ContentMD5
function generateContentMD5(str) {
  return crypto.createHash("md5").update(str).digest().toString("base64");
}

//生成InfoToSign
function generateInfoToSign(method, contentMD5, contentType, date, url) {
  return method + '\n' + contentMD5 + '\n' + contentType + '\n' + date + '\n' + url;
}

//生成Authorization
function generateAuthorization(partner_id, partner_key, infoToSign) {
  var sign = crypto.createHmac('sha1', partner_key).update(infoToSign).digest().toString('base64');

  return "SDY " + partner_id + ":" + sign;
}

//
Sudiyi.prototype = {

  // data: {"device_id":"1006865", "box_type":2, "notify_url":"http://wx.ydw123.cn/resv_notify", "auto_upgd":false, "sender_name":"zhaolei", "sender_mobile":"18624357886", "order_no":"201607060003", "consignee_mobile":"18624357886", "consignee_name":"zhaolei", "payment":0, "duration":240, "pay_type":1 }
  resv: function(data) {
    return this._fetchData('POST', '/v1/resv', '/v1/resv', data);
  },
  delete: function(resv_order_id) {
    return this._fetchData('DELETE', '/v1/resv', '/v1/resv/' + resv_order_id);
  },
  lattice: function(area) {
    return this._fetchData('GET', '/v1/lattice', '/v1/lattice?area=' + area);
  },
  boxStatus: function(device) {
    return this._fetchData('GET', '/v1/boxStatus', '/v1/boxStatus?device=' + device);
  },
  area: function() {
    return this._fetchData('GET', '/v1/area', '/v1/area');
  },
  closest: function(lat, lng) {
    return this._fetchData('GET', '/v1/closest', '/v1/closest?lat=' + lat + '&lng=' + lng);
  },

  _fetchData: function(method, func, path, data) {
    var _self = this;
    return new Promise(function(resolve, reject) {
      var contentType = 'application/json;charset=UTF-8';
      var contentMD5 = generateContentMD5('');
      var now = moment().format('ddd, DD MMM YYYY HH:mm:ss') + ' +0800';
      var infoToSign = generateInfoToSign(method, contentMD5, contentType, now, func);
      console.log('infoToSign:', infoToSign);
      var authorization = generateAuthorization(_self.conf.partner_id, _self.conf.partner_key, infoToSign);
      var headers = {
        'Content-Type': contentType,
        'Date': now,
        'Content-MD5': contentMD5,
        'Authorization': authorization
      };
      var options = {
        url: url + path,
        headers: headers,
        method: method
      };
      if (data) {
        options.data = data;
      }
      console.log('options', options);
      curl.request(options, function(err, results) {
        console.log('sudiyi:', err, results);
        if (err) {
          reject(Error(err));
        } else {
          resolve(results);
        }
      });
    });
  }

};

module.exports = Sudiyi;
