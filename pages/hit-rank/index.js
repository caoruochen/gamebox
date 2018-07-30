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
    pageShow: false,
    bannerImgWidth: bannerImgWidth,
    bannerImgHeight: bannerImgHeight,
    noticeWidth: app.globalData.wwidth/2.7,
    activityNotice: "",
    activitys: [],
    helpShow: false,
    money: app.globalData.userInfo && app.globalData.userInfo.money ? app.globalData.userInfo.money : 0,
    animationList: {},
  },

  onLoad: function (options) {
    this.loadData()
  },

  onPullDownRefresh: function () {
    this.loadData(true);
  },
  onShow: function() {
    this.setData({
      pageShow: true
    });
    app.globalData.zhuliAid = null;
    if(activityId != -1) {
      this.refreshActivityInfo()
    } 
  },

  onHide: function () {
    this.setData({
      pageShow: false
    });
  },

  onLogin: function () {
    this.loadData();
  },

  loadData: function (isPull) {
    wx.showLoading({
      title: '数据加载中'
    });
    var that = this;
    http.get('/gamebox/activity/list', function (data) {
      wx.hideLoading();
      if (isPull) {
        wx.stopPullDownRefresh();
      }
      that.setData({
        activityNotice: data.notice,
        activitys: data.activitylist,
      })
    }, function () {
      wx.hideLoading();
      if (isPull) {
        wx.stopPullDownRefresh();
      }
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
    app.globalData.zhuliAid = e.currentTarget.dataset.aid; 
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
    var ruleOpened = obj.ruleOpened;
    
    var degree = -180
    if (ruleOpened) {
      degree = 0
    }
    var anim = this.createAnim()
    anim.rotate(degree).step()

    var data = {};
    data["activitys[" + index + "].ruleOpened"] = !ruleOpened;
    data["animationList[" + index + "]"] = anim.export();
    this.setData(data)
  },

  gotoRank: function(e) {
    var aid = e.currentTarget.dataset.aid
    activityId = aid
    console.log("aid=" + aid)
    wx.navigateTo({
      url: '/pages/rank/index?aid=' +aid,
    })
  },

  createAnim: function() {
    // 箭头动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    return animation;
  },
})
