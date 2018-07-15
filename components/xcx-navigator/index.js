var util = require("../../util/util");
var http = require("../../util/http");
Component({
  externalClasses: ['nav-class'],
  properties: {
    game: {
      type: Object,
      value: null
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
      })
      app.reportLog(page, 'jump', [2, this.data.game.gameId, this.data.game.appId])
      util.updatePlayHistory(this.data.game);
      http.post('/gamebox/playlog', {gameId: this.data.game.gameId, appId: this.data.game.appId});
    },
    onNav: function (e) {
      var app = getApp();
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
