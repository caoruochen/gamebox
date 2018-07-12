var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

QKPage({
  /**
   * 页面的初始数据
   */
  data: {
    userName: 'ysx',
    userGrade: '土豪2000',
    hasActivity: false,
    categorys: []
    // categorys: [
    //   {
    //     name: '最近常玩',
    //     hasActivity: true,
    //     games: [
    //       {
    //         name: '无限楼',
    //         playerNum: '100万'
    //       },
    //       {
    //         name: '弹珠',
    //         playerNum: '99万'
    //       },
    //       {
    //         name: '你画我猜',
    //         playerNum: '100万'
    //       },
    //       {
    //         name: '谁是卧底',
    //         playerNum: '99万'
    //       },
    //     ]
    //   },
    //   {
    //     name: '小编推荐',
    //     games: [
    //       {
    //         name: '有点意思',
    //         playerNum: '10万'
    //       },
    //       {
    //         name: '别踩我',
    //         playerNum: '89万'
    //       },
    //       {
    //         name: '狼人杀',
    //         playerNum: '10万'
    //       },
    //       {
    //         name: '100层',
    //         playerNum: '89万'
    //       },
    //     ]
    //   },
    //   {
    //     name: '精彩游戏',
    //     games: [
    //       {
    //         name: '有点意思',
    //         playerNum: '10万'
    //       },
    //       {
    //         name: '别踩我',
    //         playerNum: '89万'
    //       },
    //       {
    //         name: '狼人杀',
    //         playerNum: '10万'
    //       },
    //       {
    //         name: '100层',
    //         playerNum: '89万'
    //       },
    //     ]
    //   }
    // ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGameData()
    this.setPrefInfo()
  },

  /**
   * 点击更多
   */
  clickMore: function(e) {
    var index = e.currentTarget.dataset.id
    console.log("click index="+index)
    // wx.showToast({
    //   title: this.data.categorys[index].category,
    //   icon: 'none'
    // })
    wx.navigateTo({
      url: '/pages/more-game/more-game',
    })
  },

  /**
   * 点击游戏
   */
  clickGame: function(e) {
    var index = e.currentTarget.dataset.index
    var idx = e.currentTarget.dataset.id
    console.log("click game index="+index+",id="+idx)
    wx.showToast({
      title: this.data.categorys[index].games[idx].name,
      icon: 'none'
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
        data[0].games.push(obj)
        //data[0].games.push(obj)
        /////////////////////
        data[0]['hasActivity'] = true;
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
       categorys: gameData
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
