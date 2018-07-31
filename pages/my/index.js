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
var tabbodyHeight = app.globalData.wheight - (headerRHeight + tabbarRHeight + adRHeight) * ratio;
var userInfo = app.globalData.userInfo;

QKPage({
  data: {
    userInfo: app.globalData.userInfo,
    games: [],
    gameItemWidth: (app.globalData.wwidth-150*ratio) / 5.6,
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
  onShow: function () {
    this.updateProfile();
    this.setData({
      games: util.getPlayHistory()
    });
  },
  onPullDownRefresh: function (e) {
    this.getProfile();
  },
  updateProfile: function () {
    this.setData({
      userInfo: app.globalData.userInfo ? app.globalData.userInfo : null,
    })
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
      data0.userInfo = app.globalData.userInfo ? app.globalData.userInfo : null;
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
    var target = e.currentTarget,
      taskId = target.dataset.taskid,
      op = target.dataset.op - 0,
      type = target.dataset.type - 0,
      times = target.dataset.times - 0,
      done = target.dataset.done - 0;

    switch (op) {
      case 1: // invitw
        // TODO
        return;
      case 2: // 游戏次数
        wx.switchTab({
          url: '/pages/index/index',
          fail: function () {
            wx.showToast({
              title: '操作失败',
              icon: 'none'
            });
          }
        });
        return;
      case 3: // 看视频
        // TODO
        return;
      case 4: //领金币
        break;
      default:
        wx.showToast({
          title: '任务已完成',
          icon: 'none'
        });
        return;
    }
    
    var params = {
      taskId: taskId,
      op: op,
      type: type
    };
    console.log(params)

    wx.showLoading({
      title: '请稍后',
      mask: true
    });
    var me = this;
    http.post('/gamebox/user/dotask', params, function (data) {
      wx.hideLoading();
      setTimeout(function () {
        wx.showToast({
          title: data.msg || '任务完成',
          icon: 'none'
        });
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
      }, 100);
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
  palyHistory: function(){
    if(this.data.games.length < 1){
      wx.switchTab({
        url: '/pages/index/index',
        fail: function () {
          wx.showToast({
            title: '操作失败',
            icon: 'none'
          });
        }
      });
    }else{
      wx.navigateTo({
        url: '/pages/play-history/index',
        fail: function () {
          wx.showToast({
            title: '操作失败',
            icon: 'none'
          });
        }
      });
    }
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
      me.updateProfile();
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
  },

goMall:function(e){
  var uid = userInfo ? userInfo.uid : -1;
  var token = userInfo ? userInfo.token : '';
  wx.navigateTo({
    url: '/pages/mall/index?uid=' + uid + '&token=' + token
  });
}

});
