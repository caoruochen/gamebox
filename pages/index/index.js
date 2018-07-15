var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

var app = getApp();
var ratio = app.globalData.wwidth / 750;

var swiperHeight = 130;
var defaultBanners = [{
  pic: '../../images/default-banner.png'
}];

QKPage({
  data: {
    adpos: 'bottom',
    swiperHeight: swiperHeight,
    banners: defaultBanners,
    hasActivity: false,
    categorys: [],
    bannerImgWidth: (app.globalData.wwidth - 60 * ratio),
    wwidth: app.globalData.wwidth,
    gameItemWidth: (app.globalData.wwidth-150*ratio) / 4,// 60 padding + 3*30 margin
    games: [],
    verifying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGameData()
    this.loadGame(true);
  },

  onPullDownRefresh: function (e) {
    this.loadGame(true, true);
  },
  loadGame: function (refresh, stopPullDown) {
    var me = this;
    http.get('/gamebox/games', function (data) {
      wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      me.setData({
        games: data
      });
    }, function (error, msg) {
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

  clickMore: function(e) {
    var index = e.currentTarget.dataset.id
    
    if (index == '-1') {
      index = 0 // 暂时点击游戏一览，跳转到第一项
    } 
    var type = this.data.categorys[index].type
    wx.navigateTo({
      url: '/pages/more-game/more-game?type='+type +'&position='+index,
    })
  },

  clickGame: function(e) {
    var index = e.currentTarget.dataset.index
    var idx = e.currentTarget.dataset.id
    
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.navigateToMiniProgram({
      appId: this.data.categorys[index].games[idx].appId,
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },

  loadGameData: function () {
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/recommends', function (data) {
      wx.hideLoading();
      me.setData({
        categorys: data.gamelist,
        adpos: data.adpos,
        banners: (data.banners && data.banners.length > 0) ? data.banners : defaultBanners,
        verifying: data.verifying ? data.verifying : false
      })
    }, function (error, msg) {
      wx.hideLoading();
      setTimeout(function () {
        wx.showToast({
          title: msg || '数据加载失败',
          icon: 'none'
        });
      }, 100)
    });
  }, 

})
