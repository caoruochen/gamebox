// pages/more-game/more-game.js
var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");

QKPage({

  data: {
    currentTab: 0,
    pageData: ["pageA", "pageB", "pageC", "pageD", "pageE"],
  },

  onLoad: function (options) {
    var categoryId = options.categoryId;
    this.loadCategoryData(categoryId)
  },
  
  switchNav: function(e) {
    console.log("tab=" + e.target.dataset.current)
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  bindChange: function(e) {
    console.log("run...")
    this.setData({
      currentTab: e.detail.current
    })
  },

/**
 * 加载分类数据
 */
  loadCategoryData: function(categoryId) {
    console.log("category id="+categoryId)
    
  }
})