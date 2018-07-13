var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

var app = getApp();
var ratio = app.globalData.wwidth / 750;

var swiperHeight = 130;
var defaultBanners = [{
  pic: 'https://snsgame.uimg.cn/minigame/res/banner/default.png'
},
  {
    pic: 'https://snsgame.uimg.cn/minigame/res/banner/default.png'
  }];

QKPage({
  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: swiperHeight,
    banners: defaultBanners,
    hasActivity: false,
    categorys: [],
    bannerImgWidth: (app.globalData.wwidth - 60 * ratio),
    wwidth: app.globalData.wwidth,
    gameItemWidth: (app.globalData.wwidth-180*ratio) / 4,// 60 padding + 3*30 margin
    games: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGameData()
    this.loadGame(true);
  },

  onPullDownRefresh: function (e) {
    this.loadGame(true, true);
  },
  loadGame: function (refresh, stopPullDown) {
    var me = this;
    http.get('/gamebox/games', function (data) {
      wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      if (data) {
        me.setData({
          games: data
        });
      }
    }, function () {
      wx.hideLoading();
      if (stopPullDown) {
        wx.stopPullDownRefresh();
      }
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });

  },

  /**
   * 点击更多
   */
  clickMore: function(e) {
    var index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/more-game/more-game?type='
      +this.data.categorys[index].type +'&position='+index,
    })
  },

  /**
   * 点击游戏
   */
  clickGame: function(e) {
    var index = e.currentTarget.dataset.index
    var idx = e.currentTarget.dataset.id
    
    wx.showLoading({
      title: '',
      mask: true
    });
    wx.navigateToMiniProgram({
      appId: this.data.categorys[index].games[idx].appId,
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },

  /**
   * 点击活动
   */
  clickActivity: function(e) {
    console.log(e)
    wx.showToast({
      title: '活动',
      icon: 'none'
    })
  },

  /**
   * 加载游戏数据信息
   */
  loadGameData: function () {
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/recommends', function (data) {
      console.log(data)
      if (data) {
        // 是否显示活动图
        ///////////////
        var obj = 
        {
          name: '无限楼',
          logo: 'https://snsgame.uimg.cn/video/game/wxl/logo.jpg',
          playerNum: 1000
        }
        me.loadActivityData(data)
      }
    }, function () {
      wx.hideLoading();
      
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  }, 

  /**
   * 加载活动数据
   */
  loadActivityData: function(gameData) {
     this.setData({
       categorys: gameData.gamelist
     })
    var me = this;
    http.get('/gamebox/activity', function (activityData) {
      wx.hideLoading();
      console.log(activityData)
      
    }, function () {
      wx.hideLoading();

      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },

})
