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
    }
	},
	data: {
    show: false,
    newScore: -1
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
        http.get('/gamebox/activity/rank', {
          aid: this.data.activity.aid
        }, function (data) {
          app.globalData.startGame = false;
          var user = data.userInfo;
          console.log(user)
          me.setData({
            newScore: user.score ? user.score : 0
          })
          me.triggerEvent('onupdate', data);
        }, function (code, msg) {
          app.globalData.startGame = false;
          wx.showToast({
            title: msg || '得分刷新失败',
            icon: 'none'
          })
          me.close();
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#367be9'
        })
      }
    },
    close: function () {
      app.globalData.startGame = false;
      this.setData({
        show: false
      });
      wx.setNavigationBarColor({
         frontColor: this.data.navBarFontColor,
         backgroundColor: this.data.navBarBGColor
      })
    }
	}
})
