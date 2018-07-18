var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

QKPage({
  data: {
    isLogin: false
  },
  onLoad: function () {
    this.getProfile();
  },
  onShow: function () {
    
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
  }
  
});
