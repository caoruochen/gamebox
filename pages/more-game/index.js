// pages/more-game/more-game.js
var QKPage = require("../../libs/page");
var http = require("../../util/http");
var app = getApp();
var ratio = app.globalData.wwidth / 750;
var statusBarHeight = app.globalData.sysInfo.statusBarHeight;

QKPage({

  data: {
    tabs: [],//tob标题
    games: {},//page数据
    activeIndex: 0,
    tabW: app.globalData.wwidth / 4,
    navScrollLeft: 0,
    contentHeight: app.globalData.wheight - (80 * ratio + statusBarHeight + 85),// tab高度+状态栏高度+广告高度
  },

  onLoad: function (options) {
    
    var param = options.type
    var pos = options.position
    this.setData({
      activeIndex: pos
    })
    
    console.log('pos=' + pos)
    //var defaultSelectId = categoryId - 1
    this.loadCategoryData(pos,param)
  },

  tabClick: function (e) {
    console.log(e)
    var that = this;
    var index = 0;
    for (var i = 0; i < this.data.tabs.length; i++) {
      if (this.data.tabs[i].name === e.currentTarget.dataset.item) {
        index = i
        break
      }
    }
    
    this.setData({
      activeIndex: index,
      navScrollLeft: (index - 1) * this.data.tabW
    });
  },

  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      navScrollLeft: (current - 1) * this.data.tabW
    })
    console.log(current);
    this.loadCategoryData(current, this.data.tabs[current].type)
  },

/**
 * 加载分类数据
 */
  loadCategoryData: function(key, param) {
    console.log("type="+param)
    if(this.data.games[key] != undefined) {
      return
    }
    wx.showLoading({
      title: '数据加载中'
    });
    var that = this;
    http.get('/gamebox/list', {type: param},function (data) {
      wx.hideLoading();
      console.log(data)
      var games = that.data.games;
      games[key] = data.games;
      // 设置tab数据
      that.setData({
        tabs: data.categorys,
        games: games
      })
    }, function () {
      wx.hideLoading();

      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },

})
