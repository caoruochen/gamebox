var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

var app = getApp();
QKPage({
  data: {
    wheight: app.globalData.wheight,
    imgWidth: app.globalData.wwidth - 40,
    imgHeight: 240,
    games: [],
    fit: "cover",
  },
  onLoad: function() {
    var cacheGames = util.getRecommondGames();
    if (cacheGames.length > 0) {
      this.setData({
        games: cacheGames
      });
    }
    this.loadGame(true);
  },
  onPullDownRefresh: function(e) {
    this.loadGame(true, true);
  },
  loadGame: function(refresh, stopPullDown) {
    // wx.showLoading({
    //   title: '数据加载中'
    // });
    var me = this;
    http.get('/gamebox/recommend', null, function(data) {
      // wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      me.setData({
        games: data
      });
      util.setRecommendGames(data);
    }, function(code, msg) {
      // wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    })
  },
  onReachBottom: function(e) {},
  onPageScroll: function(e) {}
});