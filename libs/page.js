var app = getApp();

var QKPage = function (options) {

  var onLoad0 = options.onLoad || null;
  var onReady0 = options.onReady || null;
  var onShow0 = options.onShow || null;

  options.__loginReadyHandler = function (stage, params) {
    if (!this.__loginReadyStage) {
      this.__loginReadyStage = {};
    }
    if (stage) {
      this.__loginReadyStage[stage] = params;
    }
    if (this.__loginReady) {
      var stages = Object.keys(this.__loginReadyStage);
      for (var i=0; i<stages.length; i++) {
        if (stages[i] == 'ready') {
          onReady0 && onReady0.call(this, this.__loginReadyStage[stages[i]]);
        }
        if (stages[i] == 'show') {
          onShow0 && onShow0.call(this, this.__loginReadyStage[stages[i]]);
        }
        delete this.__loginReadyStage[stages[i]];
      }
    }
  };

  options.onLoad = function (params) {
    var me = this;
    app.onPageReadyHandler(this, function () {
      onLoad0 && onLoad0.call(me, params)
      me.__loginReady = true;
      me.__loginReadyHandler();
    });
  };

  if (typeof options.onShareAppMessage === 'undefined') {
    options.onShareAppMessage = function (res) {
      return {
        title: '闭上眼睛点 款款都正点！7k7k游戏精选！'
      }
    };
  }

  options.onReady = function (params) {
    this.__loginReadyHandler('ready', params);
  };

  options.onShow = function (params) {
    this.__loginReadyHandler('show', params);
  };

  Page(options);
};

module.exports = QKPage
