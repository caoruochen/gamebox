// pages/more-game/more-game.js
var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();
var ratio = app.globalData.wwidth / 750;

var bannerImgWidth = app.globalData.wwidth - 60 * ratio;
var imageWidth = 345;
var imageHeight = 130;
var swiperHeight = bannerImgWidth / imageWidth * imageHeight;
var defaultBanners = [{
  pic: '../../images/default-banner.png'
}];

QKPage({
  data: {
    games: [],
    bannerImgWidth: bannerImgWidth,
    swiperHeight: swiperHeight,
    banners: defaultBanners
  },
  onLoad: function (options) {
    var cacheGames = util.getSavedGames();
    if(Object.keys(cacheGames).length > 0){
      this.setData(cacheGames);
    }
    this.loadGameData();
  },
  onShow: function () {
    this.setData({
      games: util.getPlayHistory()
    });
  },
  loadGameData: function () {
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/recommends', function (data) {
      wx.hideLoading();
      var obj = {
        categorys: data.gamelist,
        adpos: data.adpos,
        banners: (data.banners && data.banners.length > 0) ? data.banners : defaultBanners,
        verifying: data.verifying ? data.verifying : false
      };
      me.setData(obj);
      util.setSavedGames(obj);
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
