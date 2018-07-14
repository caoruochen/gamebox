Component({
  externalClasses: ['nav-class'],
  properties: {
    gameId: {
      type: String,
      value: ''
    },
    appId: {
      type: String,
      value: ''
    },
    path: {
      type: String,
      value: ''
    },
    extra: {
      type: Object,
      value: null
    },
    mode: {
      type: Number,
      value: 1
    },
    bg: {
      type: String,
      value: ''
    }
  },
  data: {
    extra: null
  },
  methods: {
    preview: function (e) {
      var app = getApp();
      var currentPages = getCurrentPages();
      var page = '';
      if (currentPages.length > 0) {
        page = currentPages.slice(-1)[0].route
      }
      var target = e.currentTarget,
        mode = target.dataset.mode,
        appId = target.dataset.appid,
        gameId = target.dataset.gameid,
        bg = target.dataset.bg;

      wx.previewImage({
        urls: [bg]
      })
      app.reportLog(page, 'jump', [2, gameId, appId])
    },
    onNav: function (e) {
      var app = getApp();
      var currentPages = getCurrentPages();
      var page = '';
      if (currentPages.length > 0) {
        page = currentPages.slice(-1)[0].route
      }
      var target = e.currentTarget,
        mode = target.dataset.mode,
        appId = target.dataset.appid,
        gameId = target.dataset.gameid,
        bg = target.dataset.bg;
      app.reportLog(page, 'jump', [1, gameId, appId])
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
