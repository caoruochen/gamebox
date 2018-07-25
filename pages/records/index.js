// pages/records/index.js
var http = require("../../util/http");
var util = require("../../util/util");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btns: ["红包", "打榜", "抽奖"],
        headers: ["活动","红包"],
        btnType: 0,
        redEnvelopeList: [],
        hitRankList: [],
        lotteryList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.requestRecordList()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        /* 这里边写上拉加载更多 */
        console.log("喵喵.....拉到底了.....")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /*
        红包,打榜,抽奖 tap
    */
    btnTypeTap: function(e) {
        this.setData({
            btnType: e.currentTarget.dataset.btntype
        });
    },
    requestRecordList: function() {
        var me = this;
        http.get('/gamebox/record/list', {
            "type": 1
        }, function(data) {
            console.log(data)
            me.setData({
                redEnvelopeList: data
            })
        }, function(code, msg) {
            console.log("code -->" + code + "msg -->" + msg)
        })
    }
})