var QKPage = require("../../libs/page");
var http = require("../../util/http");

var app = getApp();
var ratio = app.globalData.wwidth / 750;

var bannerImgWidth = app.globalData.wwidth - 60 * ratio;
var imageWidth = 345;
var imageHeight = 110;
var bannerImgHeight = bannerImgWidth / imageWidth * imageHeight;

QKPage({

  data: {
    bannerImgWidth: bannerImgWidth,
    bannerImgHeight: bannerImgHeight,
    noticeWidth: app.globalData.wwidth/2,
    activitys: [],
  },

  onLoad: function (options) {
    this.loadData()
  },

  onShow: function() {

  },

  /**
   * 加载活动数据
   */
  loadData: function () {
    wx.showLoading({
      title: '数据加载中'
    });
    var that = this;
    http.get('/gamebox/activity/list', function (data) {
      wx.hideLoading();
      console.log(data)
      var act = data.activitylist;
      for(let i=0;i<act.length; ++i) {
          var obj = act[i]
          obj.isFold = true;
          act[i] = obj
      }
      that.setData({
        activitys: act
      })
    }, function () {
      wx.hideLoading();
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },

  playMatch: function(e) {

  },

  foldToggle: function(e) {
    var index = e.currentTarget.dataset.id;
    var obj = this.data.activitys[index];
    var isFold = obj.isFold;
    obj.isFold = !isFold;
    this.data.activitys[index] = obj
    this.setData({
      activitys: this.data.activitys
    })
  },

  clickJumpPage: function(e) {
    var aid = e.currentTarget.dataset.aid
    console.log("aid=" + aid)
    wx.navigateTo({
      url: '/pages/rank/index?aid=' +aid,
    })
  },
})