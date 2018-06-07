var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

var app = getApp();
var sysInfo = app.globalData.sysInfo;
var swiperHeight = 150;
var defaultBanners = [{
  pic: 'https://snsgame.uimg.cn/minigame/res/banner/default.png'
}];

QKPage({
  data: {
    swiperHeight: swiperHeight,
    banners: defaultBanners,
    games: []
  },
  onLoad: function () {
    this.getBanners();
    this.loadGame(true);
  },
  onPullDownRefresh: function (e) {
    this.loadGame(true, true);
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
  loadGame: function (refresh, stopPullDown) {
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/games', function (data) {
      wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      if (data) {
        me.setData({
          games: data
        });
      }
    }, function () {
      wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },

  onReachBottom: function (e) {
  },
  onPageScroll: function (e) {
  },
  startGame: function (e) {
    var target = e.currentTarget
    var type = target.dataset.type
    var appId = target.dataset.appid
    var gameId = target.dataset.gameid
    var preview = target.dataset.preview
    util.startGame(this, type, appId, preview, gameId);
  }
});
