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
    lose: false,
    newScore: -1,
    rankText: '',
    tips: '未获奖'
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
          var tips = user.tips;
          if (typeof tips == 'number') {
            tips = '差'+tips+'分瓜分红包';
          }
          var lose = user.lastScore > me.data.activity.score;
          if (lose) {
            tips = '低于历史最高分';
          }
          me.setData({
            newScore: user.lastScore ? user.lastScore : 0,
            rankText: user.rank_text ? user.rank_text : '',
            tips: tips,
            lose: user.lastScore > me.data.activity.score
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
