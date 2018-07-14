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

// var taskItemHeight = 70;
// var taskHeight = taskItemHeight * 2 - 1;
// var oftenGameHeight = 71 * 3;

QKPage({
  data: {
    isLogin: false,
    userInfo: app.globalData.userInfo,
    checkSwitch: false,
    topBar: ["日常任务", "最近常玩"],
    activeIndex: 0,
    swiperHeight: tabbodyHeight,
    hasRecentGame: false,
    games: [],
    recentGames: [],
    gameItemWidth: (app.globalData.wwidth-150*ratio) / 4, // 60 padding + 3*30 margin
    tasks: [
      {
        icon: '../../images/task-icon2.png',
        name: '签到',
        desc: '100金币',
        type: 1, // 任务类型：1签到，2玩游戏金币奖励，3红包奖励
        reward: 100,
        status: 0, // 任务完成状态: 0未开始，1进行中，2已完成
        target: 5, // 任务目标值
        done: 2, // 已完成数 
      },
      {
        icon: '../../images/task-icon2.png',
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
      var obj = new saveRecentGame();
      var recentGame = obj.get();
      if(recentGame.length > 0){
        this.setData({
          recentGames: recentGame,
          hasRecentGame: true
        });
      }
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
      taskHeight = taskItemHeight*data.length - 1;
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
    switch(index - 0){
      case 0:
        // this.setData({
        //   swiperHeight: taskHeight
        // });
        break;
      case 1:
        // this.setData({
        //   swiperHeight: oftenGameHeight
        // });
        break;
    }
  },

  goLottery: function(e){
    wx.showModal({
      title: '',
      content: '抽奖活动暂未开启，敬请期待',
      showCancel: false
    })
  },
  signIn: function(e){

  },
  doTask: function(e){

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
