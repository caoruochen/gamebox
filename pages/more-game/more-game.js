// pages/more-game/more-game.js
var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

QKPage({

  data: {
    tabs: [],//tob标题
    games: {},//page数据
    activeIndex: 0,
    slideOffset: 0,
    tabW: 0,
    index: 0,
    topView: 'A',
    currentTabId: 1

  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var mtabW = res.windowWidth / 4;
        that.setData({
          tabW: mtabW
        })
      }
    });

    var categoryId = options.categoryId;
    this.loadCategoryData(0,categoryId)
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
    var offsetW = e.currentTarget.offsetLeft;
    this.setData({
      activeIndex: index,
      slideOffset: offsetW
    });
  },

  bindChange: function (e) {
    var current = e.detail.current;
    var offsetW = current * this.data.tabW;
    this.setData({
      activeIndex: current,
      index: current,
      slideOffset: offsetW,
      topView: this.data.tabs[current]
    });
    console.log(current);
    console.log(this.data.games)
    this.loadCategoryData(current, this.data.tabs[current].categoryId)
    //console.log(this.data.topView + ' ' + offsetW)
  },

/**
 * 加载分类数据
 */
  loadCategoryData: function(key, categoryId) {
    console.log("category id="+categoryId)
    wx.showLoading({
      title: '数据加载中'
    });
    var that = this;
    http.get('/gamebox/list', {category_id: categoryId},function (data) {
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
  }
})