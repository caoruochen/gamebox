Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameName: '游戏',
    userName: 'ysx',
    userGrade: '土豪2000',
    hasActivity: false,
    categorys: [
      {
        category: '最近常玩',
        hasActivity: true,
        games: [
          {
            title: '无限楼',
            playerNum: '100万'
          },
          {
            title: '弹珠',
            playerNum: '99万'
          },
          {
            title: '你画我猜',
            playerNum: '100万'
          },
          {
            title: '谁是卧底',
            playerNum: '99万'
          },
        ]
      },
      {
        category: '小编推荐',
        games: [
          {
            title: '有点意思',
            playerNum: '10万'
          },
          {
            title: '别踩我',
            playerNum: '89万'
          },
          {
            title: '狼人杀',
            playerNum: '10万'
          },
          {
            title: '100层',
            playerNum: '89万'
          },
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
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

  clickGame: function(e) {
    var index = e.currentTarget.dataset.index
    var idx = e.currentTarget.dataset.id
    console.log("click game index="+index+",id="+idx)
    wx.showToast({
      title: this.data.categorys[index].games[idx].title,
      icon: 'none'
    })
  },

  clickActivity: function(e) {
    console.log(e)
    wx.showToast({
      title: '活动',
      icon: 'none'
    })
  },

})
