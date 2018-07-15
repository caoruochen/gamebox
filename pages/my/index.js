var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var saveRecentGame = require("../../util/saveRecentGame");

var app = getApp();
var sysInfo = app.globalData.sysInfo;
var ratio = app.globalData.wwidth / 750;

var headerRHeight = 220;
var tabbarRHeight = 110;
var adRHeight = 300;
var tabbodyHeight = app.globalData.wheight - (headerRHeight + tabbarRHeight + adRHeight) * ratio

QKPage({
  data: {
    isLogin: false,
    userInfo: app.globalData.userInfo,
    checkSwitch: false,
    topBar: ["日常任务", "最近常玩"],
    activeIndex: 0,
    swiperHeight: tabbodyHeight,
    games: [],
    gameItemWidth: (app.globalData.wwidth-150*ratio) / 4, // 60 padding + 3*30 margin
    tasks: {
      doing: 0,
      done: 0,
      total: 0,
      list: []
    },
  },
  onLoad: function () {
    this.getProfile();
  },
  onPullDownRefresh: function (e) {
    this.getProfile();
  },
  getProfile: function () {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    });
    var me = this;
    http.get('/gamebox/user/profile', function (data) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      var data0 = {};
      var user = me.data.userInfo;
      if (user) {
        user.coins = data.coins;
        data0.userInfo = user;
        app.$updateUser({
          coins: data.coins
        });
      }

      if (data.tasks) {
        data0.tasks = data.tasks; 
      }
      if (data.games) {
        data0.games = data.games;
      }
      if (Object.keys(data0).length>0) {
        me.setData(data0)
      }
    }, function (errCode, msg) {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      setTimeout(function () {
        wx.showToast({
          title: msg || '数据加载失败',
          icon: 'none'
        });
      }, 100)
    });
  },
  doTask: function (e) {
    var target = e.currentTarget;
    
    var params = {
      taskId: target.dataset.taskId,
      op: target.dataset.op,
      type: target.dataset.type
    };

    wx.showLoading({
      title: '请稍后',
      mask: true
    });
    http.post('/gamebox/user/dotask', params, function (data) {
      var data0 = {}
      var user = me.data.userInfo;
      if (user) {
        user.coins = data.coins;
        data0.userInfo = user;
        app.$updateUser({
          coins: data.coins
        });
      }

      if (data.tasks) {
        data0.tasks = data.tasks; 
      }
      if (Object.keys(data0).length>0) {
        me.setData(data0);
      }
    }, function (error, msg) {
      wx.hideLoading();
      setTimeout(function () {
        wx.showToast({
          title: msg || '任务执行失败',
          icon: 'none'
        });
      });
    });
      
  },
  onGotUserInfo: function (e) {
    if (!e.detail || typeof e.detail.userInfo === 'undefined') {
      wx.showToast({
        title: '登陆需要授权',
        icon: 'none',
      }); 
      return;
    }
    var me = this;
    app.$saveLoginUser(e.detail.userInfo, e.detail, function (status) {
      if (!status) {
        return;
      };
      me.setData({
        isLogin: true,
        userInfo: app.globalData.userInfo,
      });
    });
  },
  changeTabbar: function(e){
    var index = e.currentTarget.dataset.idx;
    this.switchSwiper(index);
  },
  changeSwiper: function(e){
    if(e.detail.source === 'touch'){
      this.switchSwiper(e.detail.current);
    }
  },
  switchSwiper: function(index){
    this.setData({
        activeIndex: index
    });
  },

  goLottery: function(e){
    wx.showModal({
      title: '',
      content: '抽奖活动暂未开启，敬请期待',
      showCancel: false
    })
  },
  goDetail: function(e) {
    var gameId = e.currentTarget.dataset.gameid;
    // wx.showToast({
    //   title: this.data.categorys[index].category,
    //   icon: 'none'
    // })
    wx.navigateTo({
      url: '/pages/detail/index?gameId='
      +gameId,
    })
  }

});
