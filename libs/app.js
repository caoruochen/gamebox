var http = require("../util/http");

var QKApp = function (options) {

  var config = options.config || {}
  var scope = config.scope || 'base'
  var platform = 'wxxcx';
  var target = 'wx';
  var channel = config.channel || 'gamebox';
  var pname = config.pname || '7k7kgame0';

  options.shareInfo = {
    title: '闭上眼睛点 款款都正点！7K7K游戏精选！',
    url: ''
  }

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
  var onShow0 = options.onShow || null;
  var onHide0 = options.onHide || null;

  var loginUser = {};
  var currentTS0 = -1;
  var currentTS1 = -1;

  options.onLaunch = function (params) {
    currentTS0 = (new Date()).getTime();
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
      loginUser = this.loginUser;
      http.config(this.loginUser);
    };

    if (!isLogin) {
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
            if (data.shareTitle) {
              me.shareInfo.title = data.shareTitle;
              if (data.shareUrl) {
                me.shareInfo.url = data.shareUrl;
              }
            }

            wx.setStorageSync('uid', uid);
            wx.setStorageSync('token', token);
            wx.setStorageSync('expire', expire);
            start.call(me, params);
          });
        }
      });
    } else {
      start.call(this, params);
    }
    onLaunch0 && onLaunch0.call(this, params);
  };

  var logts = null;
  var logProcessing = false;
  var logs = [];
  var sysInfo = wx.getSystemInfoSync();

  var processLogs = function (reportAll) {
    if (logProcessing) {
      return;
    }
    logProcessing = true;
    var logs0 = [];
    var logs1 = [];
    for (var i=0; i<logs.length; i++) {
      if (i > 10 && !reportAll) {
        logs1.push(logs[i]);
      } else {
        logs0.push(logs[i]);
      }
    }
    if (logs0.length < 1) {
      logProcessing = false;
      return;
    }
    var param = {
      t0: currentTS0,
      t1: currentTS1,
      uid: loginUser ? loginUser.uid : -1,
      wb: sysInfo.brand,
      wm: sysInfo.model,
      wv: sysInfo.version,
      ws: sysInfo.system,
      wp: sysInfo.platform,
      wsdk: sysInfo.SDKVersion,
      m: JSON.stringify(logs0)
    };
    try {
      http.get('/r.gif', param, null, null, true);
      logs = logs1;
    } catch (e) {
    }
    logProcessing = false;
  };

  options.onHide = function () {
    onHide0 && onHide0.call(this);
    if (logts) {
      clearInterval(logts);
    }
    logProcessing = false;
    processLogs(true);
  };

  options.onShow = function (params) {
    onShow0 && onShow0.call(this, params);
    currentTS1 = (new Date()).getTime();

    this.reportLog('', 'onShow', JSON.stringify(params));
    if (logts) {
      clearInterval(logts);
    }
    logProcessing = false;
    setTimeout(function () {
      logts = setInterval(processLogs, 1000)
    }, 1000);
  }

  options.reportLog = function (page, event, log) {
    if (logs.length > 100) {
      return;
    }
    logs.push([page, event, log, (new Date()).getTime()]);
  };

  App(options);
};

module.exports = QKApp
