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
    pageShow: false,
    bannerImgWidth: bannerImgWidth,
    bannerImgHeight: bannerImgHeight,
    noticeWidth: app.globalData.wwidth/2.7,
    activityNotice: "",
    activitys: [],
    selectedActivity: null,
    helpShow: false,
    money: app.globalData.userInfo && app.globalData.userInfo.money ?   app.globalData.userInfo.money : 0,
    animationList: {},
  },

  onLoad: function (options) {
  },

  onPullDownRefresh: function () {
    this.loadData(true);
  },
  onShow: function() {
    if (!app.globalData.startGame) {
      this.loadData();
    }
    this.setData({
      pageShow: true
    });
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
    if(!isPull) {
      wx.showLoading({
        title: '数据加载中'
      });
    } else {
      wx.showNavigationBarLoading()
    }

    var that = this;
    http.get('/gamebox/activity/list', function (data) {
     
      if (isPull) {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      } else {
        wx.hideLoading();
      }

      var data0 = {
        activityNotice: data.notice,
        activitys: data.activitylist,
      };
      if (data.money) {
        data0.money = data.money;
      }
      
      that.setData(data0);
    }, function () {
     
      if (isPull) {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      } else {
        wx.hideLoading();
      }
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },

  onHelp: function(e) {
    var aid = e.currentTarget.dataset.aid;
    var ind = -1;
    for (var i=0; i<this.data.activitys.length; i++) {
      if (this.data.activitys[i].aid == aid) {
        ind = i;
        break;
      }
    }
    if (ind < 0) {
      wx.showToast({
        title: '活动参数错误',
        icon: 'none'
      })
      return;
    }
    this.setData({
      helpShow: true,
      selectedActivity: this.data.activitys[ind],
    })
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
    var aid = e.currentTarget.dataset.aid;
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
  onStartGame: function (e) {
    var activity = e.detail;
    app.globalData.startGame = true;
    this.setData({
      selectedActivity: activity
    })
  },
  onResultUpdate: function (e) {
    var result = e.detail,
      activity0 = result.activityInfo,
      user = result.userInfo,
      aid = activity0.aid;
    var activity = null, ind = -1;
    for (var i = 0; i < this.data.activitys.length; i++) {
      if (this.data.activitys[i].aid == aid) {
        activity = this.data.activitys[i];
        ind = i;
        break;
      }
    }
    if (!activity) {
      return;
    }
    activity.playerNum = activity0.playerNum;
    if (user.score > activity.score) {
      activity.score = user.score;
      activity.rank = user.rank;
      activity.rank_text = user.rank_text;
      if (typeof user.tips !== 'undefined') {
        activity.tips = user.tips;
      }
    }
    
    var data = {};
    data["activitys[" + ind + "]"] = activity;
    this.setData(data)
  },
  getMoney: function () {
    if (this.data.money < 0.1) {
      wx.showToast({
        title: '请努力赚钱！少于0.1元无法提现！',
        icon: 'none'
      })
      return;
    }
  }
})
