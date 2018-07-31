var util = require("../../util/util");
var http = require("../../util/http");

var app = getApp();

Component({
	externalClasses: [],
	properties: {
    navBarBGColor: {
      type: String,
      value: '#ffffff'
    },
    navBarFontColor: {
      type: String,
      value: '#000000'
    },
    pageShow: {
			type: Boolean,
			value: true,
      observer: 'onPageShow'
    },
    activity: {
      type: null,
      value: {}
    },
    newScore: {
      type: Number,
      value: 0
    },
    newRank: {
      type: Number,
      value: 0
    }
	},
	data: {
    show: false
	},

	methods: {
    onPageShow: function (newVal, oldVal, changedPath) {
      if (!this.data.activity || Object.keys(this.data.activity).length < 1) {
        return;
      }
      this.setData({
        show: !!(newVal && app.globalData.startGame)
      });
      if (newVal && app.globalData.startGame) {
        var me = this;
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#367be9'
        });
        app.globalData.startGame = false;
        http.get('/gamebox/activity/rank', {
          aid: this.data.activity.aid
        }, function (activity) {
          console.log(activity)
          me.triggerEvent('onupdate', data);
        }, function (code, msg) {
          wx.showToast({
            title: msg || '得分刷新失败',
            icon: 'none'
          })
          me.close();
        })
        // app.globalData.shareInfo = {
        //   stype: 1,
        //   __reserved: true,
        //   title: '我在7k7k游戏打榜！快来助我一把啊！',
        //   path: '/pages/rank/index?' +
        //     'aid=' + this.data.activity.aid +
        //     '&stype=1' +
        //     '&fuid=' + app.globalData.userInfo.uid +
        //     '&fname=' + encodeURIComponent(app.globalData.userInfo.name) +
        //     '&favatar=' + encodeURIComponent(app.globalData.userInfo.avatar)
        // };
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#367be9'
        })
      }
    },
    close: function () {
      this.setData({
        show: false
      });
      // app.globalData.shareInfo = {
      //   stype: 0
      // };
      wx.setNavigationBarColor({
         frontColor: this.data.navBarFontColor,
         backgroundColor: this.data.navBarBGColor
      })
    }
	}
})
