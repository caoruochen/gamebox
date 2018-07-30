var app = getApp();

var QKPage = function (options) {

  var onLoad0 = options.onLoad || null;
  var onShow0 = options.onShow || null;
  var onHide0 = options.onHide || null;

  options.onLoad = function (params) {
    wx.showShareMenu();
    onLoad0 && onLoad0.call(this, params)
    this.reportLog('onLoad', JSON.stringify(params));
  };

  options.onShow = function () {
    wx.showShareMenu();
    app.$reportPreviewNavgator(2);

    // stype=0, 取消分享设置
    if (!app.globalData.shareInfo || !app.globalData.shareInfo.__reserved) {
      app.globalData.shareInfo = {
        stype: 0
      }
    }
    
    onShow0 && onShow0.call(this)
    this.reportLog('onShow', '');
  };

  options.onHide = function () {
    onHide0 && onHide0.call(this)
  };

  options.reportLog = function (event, log) {
    app.reportLog(this.route, event, log);
  };

  if (typeof options.onShareAppMessage === 'undefined') {
    options.onShareAppMessage = function (res) {
      var ret = null;
      if (app.getShareInfo) {
        ret = app.getShareInfo()
      }
      if (!ret) {
        ret = {
          title: '闭上眼睛点 款款都正点！7K7K游戏精选！',
          path: '/pages/index/index',
          imageUrl: '/images/share.jpg'
        }
      }
      console.log(ret)
      app.reportLog(this.route, 'share', [res.from, ret.title]);
      return ret;
    };
  }

  Page(options);
};

module.exports = QKPage
