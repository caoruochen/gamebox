var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

var app = getApp();
QKPage({
  data: {
    wheight: app.globalData.wheight,
    imgWidth: app.globalData.wwidth - 40,
    imgHeight: 230,
    games: [],
    fit: "cover",
  },
  onLoad: function () {
    this.loadGame(true);
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
    var target = e.currentTarget;
    var ind = target.dataset.ind;
    if (typeof ind === 'undefined') {
      ind = target.id.substr(7)
    }
    wx.showToast({
      title: 'hhhhh: '+ind
    })
    var vsrc = this.data.games[ind].vsrc;
    if (!vsrc || vsrc.length<1) {
      var type = target.dataset.type;
      var appId = target.dataset.appid;
      var preview = target.dataset.preview;
      util.startGame(type, appId, preview);
      return;
    }
    if (typeof this.currentPlayVideo !== 'undefined' && this.currentPlayVideo != ind) {
      var currentVideoCtx = wx.createVideoContext('gvideo_'+this.currentPlayVideo, this);
      currentVideoCtx.pause();
    }
    var videoCtx = wx.createVideoContext('gvideo_'+ind, this);
    if (this.currentPlayVideo != ind) {
      this.currentPlayVideo = ind;
      videoCtx.play();
    }
    if (this.data.games[ind].vshow) {
      return;
    }
    var string = "games["+ind+"].vshow";
    this.setData({
      [string]: true
    })
  },
  videoError: function (e) {
    console.log(e)
  },
  playGame: function (e) {
    var target = e.currentTarget;
    var type = target.dataset.type;
    var appId = target.dataset.appid;
    var preview = target.dataset.preview;
    util.startGame(type, appId, preview);
  }
});
