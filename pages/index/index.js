var http = require("../../util/http");

var app = getApp();
Page({
  data: {
    wheight: app.globalData.wheight,
    imgWidth: app.globalData.wwidth - 40,
    imgHeight: 300,
    games: [],
    fit: "cover",
  },
  onLoad: function () {
    this.loadGame(true);
  },
  onShow: function (e) {
  },
  onPullDownRefresh: function (e) {
    this.loadGame(true, true);
  },
  loadGame: function (refresh, stopPullDown) {
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/recommend', null, function (data) {
      wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      me.setData({
        games: data
      });
    }, function (code, msg) {
      wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    })
  },
  onReachBottom: function (e) {
  },
  onPageScroll: function (e) {
  },
  changeVideo: function (e) {
    var target = e.currentTarget
    var ind = target.dataset.ind
    var vsrc = this.data.games[ind].vsrc
    if (this.data.games[ind].vshow 
        || !vsrc || vsrc.length<1) {
      return;
    }
    var videoCtx = wx.createVideoContext('gvideo_'+ind, this);
    var string = "games["+ind+"].vshow";
    this.setData({
      [string]: true
    })
    videoCtx.play();
  },
  videoError: function (e) {
    console.log(e)
  },
  startGame: function (e) {
    var target = e.currentTarget
    var type = target.dataset.type
    var appId = target.dataset.appid
    var preview = target.dataset.preview
    if (type == 1) {
      wx.navigateToMiniProgram({
        appId: appId,
        extraData: {
          _source: '7kminigame'
        }
      })
    } else {
      wx.previewImage({
        urls: [preview]
      })
    }
  }
});
