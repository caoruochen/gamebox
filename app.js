var QKApp = require("./libs/app");
var http = require("./util/http");

QKApp({
  config: {
    api: 'https://api-game.7k.cn',
    acct: 'https://acct-game.7k.cn',
    log: 'https://log-game.7k.cn',
    version: '1.0.1'
  },
  onLaunch: function (options) {
    var sysInfo = wx.getSystemInfoSync();
    this.globalData.sysInfo = sysInfo;
    this.globalData.wwidth = sysInfo.windowWidth;
    this.globalData.wheight = sysInfo.windowHeight;
    this.globalData.pixelRatio = sysInfo.pixelRatio;
    this.globalData.shareInfo = {};
  },
  onShow: function (options) {
    console.log('app.onshow')
    console.log(options)
    this.globalData.showParams = options;
  },
  savedOftenGame: function(obj, game){
    obj.save(game);
  },
  globalData: {},
  getShareInfo: function () {
    if (!this.globalData.shareInfo || !this.globalData.shareInfo.stype) {
      return null;
    }
    var stype = this.globalData.shareInfo.stype;
    console.log('stype '+stype)
    console.log(this.globalData.shareInfo)
    switch (stype) {
      case 1: // 邀请助力
        return {
          title: this.globalData.shareInfo.title || '我在7K7K游戏打榜！快来助我一把啊！',
          path: this.globalData.shareInfo.path || '/pages/rank/index',
          imageUrl: this.globalData.shareInfo.imageUrl || '/images/share.jpg'
        };
    }
    return null;
  }
})
