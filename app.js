var QKApp = require("./libs/app");
var http = require("./util/http");

QKApp({
  config: {
    httpApi: 'https://snsapi.7k.cn'
  },
  onLaunch: function (options) {
    var sysInfo = wx.getSystemInfoSync();
    this.globalData.sysInfo = sysInfo;
    this.globalData.wwidth = sysInfo.windowWidth;
    this.globalData.wheight = sysInfo.windowHeight;
    this.globalData.pixelRatio = sysInfo.pixelRatio;

    wx.showShareMenu();
  },
  globalData: {}
})
