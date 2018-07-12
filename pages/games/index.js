var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var saveRecentGame = require("../../util/saveRecentGame");

var app = getApp();
var sysInfo = app.globalData.sysInfo;
var userInfo = app.globalData.userInfo || {name: '张三', avatar: '../../images/defaultavatar.png', sex: 1,coins: '1000', points: '20', title: '贫民',level: 2};
// var userInfo = {name: '张三', avatar: '../../images/fenlei0.png',sex: 1,coins: '1000', diamond: '20', title: '贫民',level: 2};

QKPage({
  data: {
    isLogin: false,
    userInfo: userInfo,
    checkSwitch: false,
    games: [],
    tasks: [
      {
        icon: '../../images/jingxuan1.png',
        name: '签到',
        desc: '100金币',
        type: 1, // 任务类型：1签到，2玩游戏金币奖励，3红包奖励
        reward: 100,
        status: 0, // 任务完成状态: 0未开始，1进行中，2已完成
        target: 5, // 任务目标值
        done: 2, // 已完成数 
      },
      {
        icon: '../../images/jingxuan1.png',
        name: '玩游戏金币奖励',
        desc: '100金币',
        type: 2, // 任务类型：1签到，2玩游戏金币奖励，3红包奖励
        reward: 100,
        status: 0, // 任务完成状态: 0未开始，1进行中，2已完成
        target: 5, // 任务目标值
        done: 2, // 已完成数 
      }
    ]
  },
  onLoad: function () {
    if(this.data.checkSwitch > 0){
      // this.loadTask();
    }else{
      this.loadGameData();
    }
  },
  onPullDownRefresh: function (e) {

  },
  loadTask: function () {
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/games', function (data) {
      wx.hideLoading();
      if (data) {
        me.setData({
          tasks: data
        });
      }
    }, function () {
      wx.hideLoading();
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },
  loadGameData: function () {
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/recommends', function (data) {
      me.setData({
        checkSwitch: data.verifying,
        games: data.gamelist[0].games
      });
      wx.hideLoading();
    }, function () {
      wx.hideLoading();
      
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  }, 
  onGotUserInfo: function (e) {
    if (!e.detail || typeof e.detail.userInfo === 'undefined') {
      wx.showToast({
        title: '获取头像需要授权',
        icon: 'none',
        mask: true
      }); 
      return;
    }
    wx.showLoading({
      title: '授权中...',
      mask: true
    })
    var me = this;
    app.$saveLoginUser(e.detail.userInfo, e.detail, function (saveFailed) {
      if (saveFailed) {
        return;
      };
      me.setData({
        isLogin: true,
        userInfo: app.globalData.userInfo,
      });
      wx.hideLoading();
    });
  },
  goLottery: function(e){
    
  },
  signIn: function(e){

  },
  doTask: function(e){

  }

});
