var app = getApp();

var QKPage = function (options) {

  var onLoad0 = options.onLoad || null;
  var onShow0 = options.onShow || null;

  options.onLoad = function (params) {
    wx.showShareMenu();
    onLoad0 && onLoad0.call(this, params)

    this.reportLog('onLoad', JSON.stringify(params));
  };

  options.onShow = function () {
    wx.showShareMenu();
    app.$reportPreviewNavgator(2);
    onShow0 && onShow0.call(this)
    this.reportLog('onShow', '');
  };

  options.reportLog = function (event, log) {
    app.reportLog(this.route, event, log);
  }

  if (typeof options.onShareAppMessage === 'undefined') {
    options.onShareAppMessage = function (res) {
      var ret = {
        title: '7K7K游戏',
        path: '/pages/index/index'
      };
      if (app.shareInfo) {
        if (app.shareInfo.title) {
          ret.title = app.shareInfo.title;
        }
        if (app.shareInfo.url) {
          ret.imageUrl = app.shareInfo.url;
        }
      }
      app.reportLog(this.route, 'share', [res.from, ret.title]);
      return ret;
    };
  }

  Page(options);
};

module.exports = QKPage
