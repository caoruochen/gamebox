var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();
var userInfo = app.globalData.userInfo;

QKPage({
  data: {
    mallUrl: 'https://game.7k.cn'
  },
  onLoad: function (options) {
  	var mallUrl = this.data.mallUrl;
  	var uid = userInfo ? userInfo.uid : -1;
    var token = userInfo ? userInfo.token : '';
  	mallUrl = mallUrl + '?uid=' + uid + '&token=' + token;
  	this.setData({mallUrl: mallUrl});
  },
  onShow: function (options) {
  }
});
