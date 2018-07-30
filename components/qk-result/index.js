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
    aid: {
      type: null,
      value: '',
      observer: 'changeActivity'
    },
    score: {
      type: Number,
      value: 0
    },
    rank: {
      type: null,
      value: ''
    },
	},
	data: {
    show: false
	},

	methods: {
    onPageShow: function (newVal, oldVal, changedPath) {
      console.log("onPageShow " + newVal + ", " + app.globalData.startGame)
      this.setData({
        show: !!(newVal && app.globalData.startGame)
      });
      if (newVal) {
        if (app.globalData.startGame) {
          wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#367be9'
          });
          app.globalData.startGame = false
        }
      }
    },
    close: function () {
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
