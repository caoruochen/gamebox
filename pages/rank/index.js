var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();

QKPage({
  onLoad: function (options) {
    console.log(options)
    console.log(app.globalData)
  }
})
