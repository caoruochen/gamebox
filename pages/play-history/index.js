// pages/more-game/more-game.js
var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();
var ratio = app.globalData.wwidth / 750;

QKPage({

  data: {
    games: []
  },

  onShow: function () {
    this.setData({
      games: util.getPlayHistory()
    });
  }
})
