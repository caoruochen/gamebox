var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

var app = getApp();
var ratio = app.globalData.wwidth / 750;

var swiperHeight = 130;
var gameItemHeight = 150;
var defaultBanners = [{
  pic: '../../images/default-banner.png'
}];

QKPage({
  data: {
    adpos: 'bottom',
    swiperHeight: swiperHeight,
    banners: defaultBanners,
    hasActivity: false,
    categorys: [],
    bannerImgWidth: (app.globalData.wwidth - 60 * ratio),
    bannerImgHeights: [],
    currentSwiper: 0,
    wwidth: app.globalData.wwidth,
    gameItemWidth: (app.globalData.wwidth-150*ratio) / 4.5,// 60 padding + 3*30 margin
    games: [],
    verifying: false,
    tabs: [],
    tabPageData: {},
    activeIndex: 0,
    tabW: app.globalData.wwidth / 4,
    contentHeight: 7 * gameItemHeight * ratio, // 默认显示7条
    itemTextWidth: app.globalData.wwidth - (50 + 60 + 60 * ratio), // 图片宽度 + 按钮 + 左右padding
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadGameData()
    this.loadGame(true);
    this.loadCategoryData(0, "hots")
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
      me.setData({
        games: data
      });
    }, function (error, msg) {
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
  imgHeight:function(e){
    var bannerImgWidth = this.data.bannerImgWidth; //获取当前图片的宽度
    var bannerImgHeights = this.data.bannerImgHeights;
    var imgh = e.detail.height;//图片实际高度
    var imgw = e.detail.width;//图片实际宽度
    var bannerImgHeight = bannerImgWidth * imgh / imgw;//等比设置swiper的高度
    bannerImgHeights[e.currentTarget.dataset.index] = bannerImgHeight
    this.setData({
      bannerImgHeights: bannerImgHeights //设置高度
    });
  },
  changeSwiper: function(e){
    this.setData({
      currentSwiper: e.detail.current
    });
  },

  clickMore: function(e) {
    var index = e.currentTarget.dataset.id
    
    if (index == '-1') {
      index = 0 // 暂时点击游戏一览，跳转到第一项
    } 
    var type = this.data.categorys[index].type
    wx.navigateTo({
      url: '/pages/more-game/more-game?type='+type +'&position='+index,
    })
  },

  clickGame: function(e) {
    var index = e.currentTarget.dataset.index
    var idx = e.currentTarget.dataset.id
    
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.navigateToMiniProgram({
      appId: this.data.categorys[index].games[idx].appId,
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },

  loadGameData: function () {
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/recommends', function (data) {
      wx.hideLoading();
      me.setData({
        categorys: data.gamelist,
        adpos: data.adpos,
        banners: (data.banners && data.banners.length > 0) ? data.banners : defaultBanners,
        verifying: data.verifying ? data.verifying : false
      })
    }, function (error, msg) {
      wx.hideLoading();
      setTimeout(function () {
        wx.showToast({
          title: msg || '数据加载失败',
          icon: 'none'
        });
      }, 100)
    });
  }, 

  tabClick: function (e) {
    console.log(e)
    var tabIndex = e.currentTarget.id
    var tabType = e.currentTarget.dataset.type;
    //this.loadCategoryData(tabIndex, tabType)
    this.setData({
      activeIndex: tabIndex,
      navScrollLeft: (tabIndex - 1) * this.data.tabW
    });
  },

  bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      navScrollLeft: (current - 1) * this.data.tabW
    })

    this.loadCategoryData(current, this.data.tabs[current].type)
  },

  /**
 * 加载分类数据
 */
  loadCategoryData: function (key, param) {
    console.log("type=" + param)
    console.log("test="+this.data.tabPageData[key])
     if (this.data.tabPageData[key] != undefined) {
       console.log("array size="+this.data.tabPageData[key].length)
     
      //  this.setData({
      //    tabPageData: this.data.tabPageData[key],
      //  })
       return
     }
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/list', { type: param }, function (data) {
      wx.hideLoading();
      console.log(data)
      var tabPageData = me.data.tabPageData;
      tabPageData[key] = data.games;
    
      // 设置tab数据
      me.setData({
        tabs: data.categorys,
        tabPageData: tabPageData,
      })
      
    }, function (error, msg) {
      wx.hideLoading();

      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  },
})
