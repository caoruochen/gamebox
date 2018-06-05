var http = require("../../util/http");

var app = getApp();
var sysInfo = app.globalData.sysInfo;
var swiperHeight = 150;
var defaultBanners = [{
  pic: 'https://snsgame.uimg.cn/minigame/res/banner/default.png'
}];

Page({
  data: {
    swiperHeight: swiperHeight,
    banners: defaultBanners,
    games: []
  },
  onLoad: function () {
    console.log(sysInfo)
    this.getBanners();
    this.loadGame(true);
  },
  onShow: function (e) {
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
    var preview = target.dataset.preview
    if (type == 1) {
      wx.showLoading({
        title: '',
        mask: true
      });
      wx.navigateToMiniProgram({
        appId: appId+'--',
        extraData: {
          _from: '7kminigame'
        },
        success: function (res) {
          console.log(res)
        },
        fail: function (err) {
        },
        complete: function (res) {
          wx.hideLoading();
        }
      })
    } else {
      wx.previewImage({
        urls: [preview]
      })
    }
  }
});
