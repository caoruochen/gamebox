var app = getApp();
var sysInfo = app.globalData.sysInfo;
var swiperHeight = 150;
var qkapi = 'https://snsapi.7k.cn';
var http = require('../../util/http');
var defaultBanners = [{
  pic: 'https://snsgame.uimg.cn/minigame/res/banner/default.png'
}];

Page({
  data: {
    toView: 'red',
    swiperHeight: swiperHeight,
    gamesHeight: sysInfo.windowHeight - swiperHeight,
    scrollTop: 0,
    banners: [],
    games: []
  },
  onShow: function (e) {
    this.getBanners();
    this.getGames();
  },
  getBanners: function () {
    var me = this;
    http.get('/gamebox/banner', function (data) {
      if (data) {
        me.setData({
          banners: data
        });
      } else {
        me.setData({
          banners: defaultBanners
        });
      }
    });
  },
  getGames: function () {
    var me = this;
    http.get('/gamebox/games', function (data) {
      if (data) {
        me.setData({
          games: data
        });
      }
    });
  },
  upper: function (e) {
  },
  lower: function (e) {
  },
  scroll: function (e) {
  },
  goto: function(event) {
    var target = event.currentTarget;
    var appId = target.dataset.appid
    if (!appId) {
      return;
    }
    var extraData = {source: '7kgames'};
    if (target.dataset.extra) {
      var extraData0 = JSON.parse(target.dataset.extra)
      for (var k in extraData0) {
        extraData[k] = extraData0[k]
      }
    }
    wx.navigateToMiniProgram({
      appId: appId,
      extraData: extraData,
      complete: function (e) {
        //console.log(e)
      }
    })
  }
})
