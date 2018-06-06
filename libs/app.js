var http = require("../util/http");

var QKApp = function (options) {

  var config = options.config || {}
  var scope = config.scope || 'base'
  var platform = 'wxxcx';
  var target = 'wx';
  var channel = config.channel || 'gamebox';
  var pname = config.pname || '7k7kgame0';

  if (config.httpApi) {
    http.config({
      api: config.httpApi,
      platform: platform,
      target: target,
      channel: channel,
      pname: pname,
      successCode: 200,
      loginCode: -101,
      login: function () {
        var pages = getCurrentPages();
        if (pages && pages.length > 0) {
          var route = pages[pages.length-1].route;
          route = route.split('/').splice(-1)[0]
          wx.removeStorageSync('token');
          wx.reLaunch({
            url: route,
            fail: function () {
              wx.showToast({
                title: '登录失败，请关闭重开',
                icon: 'none',
                mask: true
              });
            }
          });
        }

      }
    });
  }

  var onLaunch0 = options.onLaunch || null;

  var startPage = null;
  var startPageHandler = null;

  options.onPageReadyHandler = function (page, handler) {
    if (this.loginUser && this.loginUser.uid) {
      startPage = null;
      startPageHandler = null;
      handler && handler.call(page)
    } else {
      startPage = page;
      startPageHandler = handler;
    }
  };

  var loginFailed = function (msg) {
    wx.hideLoading();
    wx.showToast({
      title: msg || '登陆失败',
      icon: 'none',
      mask: true
    });
    wx.navigateBack({
      delta: -1
    })
  };

  options.onLaunch = function (params) {
    var uid = wx.getStorageSync('uid');
    var token = wx.getStorageSync('token');
    var expire = wx.getStorageSync('expire');
    var isLogin = false;
    if (uid && token && expire) {
      var ts = parseInt((new Date()).getTime()/1000);
      if (ts < (expire - 3600)) { // 提前1小时刷新token
        isLogin = true;
      }
    }

    var start = function (params) {
      this.loginUser = {
        uid: uid,
        token: token,
        expire: expire
      };
      http.config(this.loginUser);
      onLaunch0 && onLaunch0.call(this, params);
      if (startPageHandler) {
        startPageHandler.call(startPage)
      }
    };

    if (!isLogin) {
      wx.showLoading({
        title: '登陆中',
        mask: true
      });
      var me = this;
      wx.login({
        success: function (res) {
          var param = {
            code: res.code,
            scope: scope,
            platform: platform,
            channel: channel,
            pname: pname
          };
          http.post('/auth2/'+target, param, function (data) {
            uid = data.uid;
            token = data.token;
            expire = data.expire;
            wx.setStorageSync('uid', uid);
            wx.setStorageSync('token', token);
            wx.setStorageSync('expire', expire);
            wx.hideLoading();
            start.call(me);
          }, function (code, msg) {
            loginFailed();
          });
        },
        fail: function () {
          loginFailed();
        }
      });
    } else {
      start.call(this);
    }
  };

  App(options);
};

module.exports = QKApp
