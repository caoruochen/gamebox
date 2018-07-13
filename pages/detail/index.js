var QKPage = require("../../libs/page");
var http = require("../../util/http");
var msg = "";

QKPage({
  /**
   * 页面的初始数据
   */
  data: {
    gameDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (param) {
    this.loadData(param);
  },

  loadData: function(param){
    wx.showLoading({
      title: '数据加载中'
    });
    var me = this;
    http.get('/gamebox/detail', param, function (data) {
      wx.setNavigationBarTitle({
        title: data.name
      });
      me.setData({
        gameDetail: data
      });
      wx.hideLoading();
    }, function () {
      wx.hideLoading();
      wx.showToast({
        title: msg || '数据加载失败',
        icon: 'none'
      });
    });
  }

})
