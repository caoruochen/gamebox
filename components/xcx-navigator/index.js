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
  methods: {
    preview: function (e) {
      var app = getApp();
      var currentPages = getCurrentPages();
      var page = '';
      if (currentPages.length > 0) {
        page = currentPages.slice(-1)[0].route
      }

      wx.previewImage({
        urls: [this.data.bg]
      })
      app.reportLog(page, 'jump', [2, this.data.gameId, this.data.appId])
    },
    onNav: function (e) {
      var app = getApp();
      var currentPages = getCurrentPages();
      var page = '';
      if (currentPages.length > 0) {
        page = currentPages.slice(-1)[0].route
      }
      app.reportLog(page, 'jump', [1, this.data.gameId, this.data.appId])
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
