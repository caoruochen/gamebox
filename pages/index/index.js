var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

var app = getApp();
var ratio = app.globalData.wwidth / 750;

QKPage({
  /**
   * 页面的初始数据
   */
  data: {
    userName: 'ysx',
    userGrade: '土豪2000',
    hasActivity: false,
    categorys: [],
    wwidth: app.globalData.wwidth,
    gameItemWidth: (app.globalData.wwidth-150*ratio) / 4 // 60 padding + 3*30 margin
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    this.loadGameData()
    this.setPrefInfo()
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

  /**
   * 设置配置信息
   */
  setPrefInfo: function(e) {
    wx.getSystemInfo({
      success: function(res) {
        console.log("screenWidth="+res.screenWidth+", screenHeight="+ res.screenHeight)
      },
    })
  },
})
