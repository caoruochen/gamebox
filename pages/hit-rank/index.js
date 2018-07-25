var QKPage = require("../../libs/page");
var http = require("../../util/http");

var app = getApp();
var ratio = app.globalData.wwidth / 750;

var bannerImgWidth = app.globalData.wwidth - 60 * ratio;
var imageWidth = 345;
var imageHeight = 110;
var bannerImgHeight = bannerImgWidth / imageWidth * imageHeight;
var activityId = -1;

QKPage({

  data: {
    bannerImgWidth: bannerImgWidth,
    bannerImgHeight: bannerImgHeight,
    noticeWidth: app.globalData.wwidth/2,
    activityNotice: "",
    activitys: [],
    helpShow: false,
  },

  onLoad: function (options) {
    this.loadData()
  },

  onShow: function() {
    if(activityId != -1) {
      this.refreshActivityInfo()
    } 
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
        activityNotice: data.notice,
        activitys: act,

      })
    }, function () {
      wx.hideLoading();
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },

  /**
   * 刷新活动信息
   */
  refreshActivityInfo: function() {
    var that = this;
    http.get('/gamebox/activity/rankinfo', {aid: activityId},function (data) {
       for (let i = 0; i < that.data.activitys.length; i++) {
         if(data.aid == that.data.activitys[i].aid) {
           that.data.activitys[i].score = data.score
         }
       }
      
       that.setData({
         activitys: that.data.activitys
       })
    }, function () {
    });
  },

  onHelp: function(e) {
    this.setData({
      helpShow: true
    })
  },

  playMatch: function(e) {
    var aid = e.currentTarget.dataset.aid;
    activityId = aid;
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
    activityId = aid
    console.log("aid=" + aid)
    wx.navigateTo({
      url: '/pages/rank/index?aid=' +aid,
    })
  },
})