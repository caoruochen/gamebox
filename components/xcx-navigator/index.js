var util = require("../../util/util");
var http = require("../../util/http");
Component({
  externalClasses: ['nav-class'],
  properties: {
    game: {
      type: Object,
      value: null
    },
    fromHistory: { // 从玩过的记录打开
      type: Number,
      value: 0
    }
  },
  methods: {
    preview: function (e) {
      var app = getApp();
      var currentPages = getCurrentPages();
      var page = '';
      if (currentPages.length > 0) {
        page = currentPages.slice(-1)[0].route
      }

      wx.previewImage({
        urls: [this.data.game.bg]
      });
      util.updatePlayHistory(this.data.game);
      app.reportLog(page, 'jump', [2, this.data.game.gameId, this.data.game.appId, 1]);
      app.$reportPreviewNavgator(1, this.data.game, page, this.data.fromHistory);
    },
    onNav: function (e) {
      this.triggerEvent('onclick')
      var app = getApp();
      var r = util.compareVersion(app.globalData.sysInfo.SDKVersion, '2.0.7');
      if (r < 0) {
        wx.navigateToMiniProgram({
          appId: this.data.game.appId,
          path: this.data.game.path,
          extraData: this.data.game.extra
        });
      }

      var currentPages = getCurrentPages();
      var page = '';
      if (currentPages.length > 0) {
        page = currentPages.slice(-1)[0].route
      }
      util.updatePlayHistory(this.data.game);
      http.post('/gamebox/playlog', {gameId: this.data.game.gameId, appId: this.data.game.appId});
      app.reportLog(page, 'jump', [1, this.data.game.gameId, this.data.game.appId])
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      setTimeout(function () {
        wx.hideLoading();
      }, 2000);
    }
  }
})
