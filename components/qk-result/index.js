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
    }
	},
	data: {
    show: false
	},

	methods: {
    onPageShow: function (newVal, oldVal, changedPath) {
      this.setData({
        show: !!(newVal && app.globalData.startGame)
      });
      if (newVal) {
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#367be9'
        });
        app.globalData.startGame = false
      } else {
        wx.setNavigationBarColor({
          frontColor: this.data.navBarFontColor,
          backgroundColor: this.data.navBarBGColor
        })
      }
    },
	}
})
