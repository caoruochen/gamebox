var util = require("../../util/util");
var http = require("../../util/http");

var app = getApp();

Component({
  properties: {
    loginText: {
      type: String,
      value: '登陆赢金币'
    }
  },
  data: {
    hasLogin: !!app.globalData.userInfo
  },
  attached: function() {
    this.setData({
      hasLogin: !!app.globalData.userInfo
    });
  },
  methods: {
    onGotUserInfo: function (e) {
      var loginFailed = function (msg) {
        wx.showToast({
          title: msg || '登陆需要授权',
          icon: 'none',
        });
      };
      if (!e.detail || typeof e.detail.userInfo === 'undefined') {
        loginFailed();
        return;
      }
      var me = this;
      app.$saveLoginUser(e.detail.userInfo, e.detail, function (status) {
        if (!status) {
          loginFailed('授权失败，请重试');
          return;
        };
        me.triggerEvent('onlogin')
        me.setData({
          hasLogin: !!app.globalData.userInfo
        });
      });

    }
  }
})
