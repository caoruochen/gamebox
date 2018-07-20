var QKPage = require("../../libs/page");
var http = require("../../util/http");

QKPage({

  data: {
  
  },

  onLoad: function (options) {
  
  },

  /**
   * 列表点击事件
   */
  itemClick: function(e) {
   wx.navigateTo({
     url: '/pages/rank/index',
   })
  }
})