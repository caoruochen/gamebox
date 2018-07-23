var QKPage = require("../../libs/page");
var http = require("../../util/http");

QKPage({

  data: {
    activityDatas: []
  },

  onLoad: function (options) {
    this.loadData()
  },

  /**
   * 列表点击事件
   */
  itemClick: function(e) {
    var instance = e.currentTarget.dataset.item
    console.log("aid="+instance.aid)
    wx.navigateTo({
      url: '/pages/rank/index?aid='+instance.aid,
    })
  },

  /**
   * 加载活动数据
   */
  loadData: function() {
    wx.showLoading({
      title: '数据加载中'
    });
    var that = this;
    http.get('/gamebox/activity/list', function (data) {
      wx.hideLoading();
      console.log(data)
      that.setData({
        activityDatas: data
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