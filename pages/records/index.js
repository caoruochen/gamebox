// pages/records/index.js
var http = require("../../util/http");
var util = require("../../util/util");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        btns: ["红包", "打榜", "抽奖"],
        btnType: 0,
        dataList: [],
        hitRankList: [],
        lotteryList: [],
        lastRid: 0,
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
        // console.log("喵喵.....拉到底了.....")
        this.requestRecordList()
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
        this.requestRecordList()
    },
    requestRecordList: function() {
        var me = this;
        console.log("me.data.btnType + 1 ==" + me.data.btnType + 1)
        console.log("me.data.lastRid ==" + me.data.lastRid)
        http.get('/gamebox/record/list', {
            "type": me.data.btnType + 1,
            "rid": me.data.lastRid
        }, function(data) {
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
        }, function(code, msg) {
            console.log("code -->" + code + "msg -->" + msg)
        })
    }
})