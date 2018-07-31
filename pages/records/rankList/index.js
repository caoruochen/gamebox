// pages/records/rankList/index.js
var http = require("../../../util/http");
var util = require("../../../util/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    btnType: 1,
    lastRid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.requestRecordList()
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
  /*
    请求数据
  */
  requestRecordList: function () {
      var me = this;
      console.log("me.data.lastRid ==" + me.data.lastRid)
      http.get('/gamebox/record/list', {
          "type": me.data.btnType,
          "rid": me.data.lastRid
      }, function (data) {
          // console.log(data)
          var lastDict = data[data.length - 1];
          var tempArr = me.data.dataList;
          var t = []
          console.log(data[0])
          console.log(tempArr[tempArr.length - 1])
          if (tempArr.length > 0 && (data[0].rid > tempArr[tempArr.length - 1].rid)) {
              /* 加载更多的时候 */
              t = tempArr.concat(data)
              console.log("+++++++++++")
          } else {
              /* 没有更多数据的时候 */
              if (tempArr.length > 0) {
                  t = tempArr
              } else {
                  /* 第一次进来的时候 */
                  t = data
              }

              console.log("===========")
              console.log(t)
          }
          me.setData({
              dataList: t,
              lastRid: lastDict.rid,
          })
      }, function (code, msg) {
          console.log("code -->" + code + "msg -->" + msg)
      })
  }
})