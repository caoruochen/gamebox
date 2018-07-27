var QKPage = require("../../libs/page");
var http = require("../../util/http");

var app = getApp();
var ratio = app.globalData.wwidth / 750;

var bannerImgWidth = app.globalData.wwidth - 60 * ratio;
var imageWidth = 345;
var imageHeight = 110;
var bannerImgHeight = bannerImgWidth / imageWidth * imageHeight;
var activityId = -1;

QKPage({

  data: {
    bannerImgWidth: bannerImgWidth,
    bannerImgHeight: bannerImgHeight,
    noticeWidth: app.globalData.wwidth/2.7,
    activityNotice: "",
    activitys: [],
    helpShow: false,
    money: app.globalData.userInfo && app.globalData.userInfo.money ? app.globalData.userInfo.money : 0,
    animationList: {},
  },

  onLoad: function (options) {
    this.loadData()
   
  },

  onShow: function() {
    app.globalData.zhuliAid = null;
    if(activityId != -1) {
      this.refreshActivityInfo()
    } 
  },

  onLogin: function () {
    // TODO 登陆后拉取用户数据
  },

  /**
   * 加载活动数据
   */
  loadData: function () {
    wx.showLoading({
      title: '数据加载中'
    });
    var that = this;
    http.get('/gamebox/activity/list', function (data) {
      wx.hideLoading();
      console.log(data)
      var act = data.activitylist;
      for(let i=0;i<act.length; ++i) {
          var obj = act[i]
          obj.isFold = true;
          /** 测试数据*/
          if(i % 2 !=0) {
            obj.texts = ['戏我有阿通在地狱等我']
          } else {
            obj.texts = ['又不是回合制游戏', '你有什么，双手吗？', '看起来你们腐烂的比我还要快']
          }
          /******************************/
          act[i] = obj
      }
      that.setData({
        activityNotice: data.notice,
        activitys: act,
      })
    }, function () {
      wx.hideLoading();
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },

  /**
   * 刷新活动信息
   */
  refreshActivityInfo: function() {
    var that = this;
    http.get('/gamebox/activity/rankinfo', {aid: activityId},function (data) {
       for (let i = 0; i < that.data.activitys.length; i++) {
         if(data.aid == that.data.activitys[i].aid) {
           that.data.activitys[i].score = data.score
         }
       }
      
       that.setData({
         activitys: that.data.activitys
       })
    }, function () {
    });
  },
  onShareAppMessage: function(res) {
    return {
      title: '我在7k7k游戏打榜！快来助我一把啊！',
      path: '/pages/rank/index?aid=' + app.globalData.zhuliAid + '&fuid=' + app.globalData.userInfo.uid + '&type=1'
    }
  },

  onHelp: function(e) {
    app.globalData.zhuliAid = e.currentTarget.dataset.aid; 
    this.setData({
      helpShow: true
    })
  },

  playMatch: function(e) {
    var aid = e.currentTarget.dataset.aid;
    activityId = aid;
  },

  foldToggle: function(e) {
    var index = e.currentTarget.dataset.id;
    var obj = this.data.activitys[index];
    var isFold = obj.isFold;
    // 箭头动画
    
    var degree = 0
    if (isFold) {
      degree = -180
    }
    var anim = this.createAnim()
    anim.rotate(degree).step()
    // this.data.animationList[index] = anim.export()

    // obj.isFold = !isFold;

    var data = {};
    data["activitys[" + index +"].isFold"] = !isFold;
    data["animationList[" + index + "]"] = anim.export();
    this.setData(data)

    console.log(this.data.activitys)

    // this.data.activitys[index] = obj
    // this.setData({
    //   activitys: this.data.activitys,
    //   animationList: this.data.animationList
    // })
  },

  clickJumpPage: function(e) {
    var aid = e.currentTarget.dataset.aid
    activityId = aid
    console.log("aid=" + aid)
    wx.navigateTo({
      url: '/pages/rank/index?aid=' +aid,
    })
  },

  createAnim: function() {
    // 箭头动画
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'linear'
    })
    return animation;
  }
})
