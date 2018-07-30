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
		helpList: {
			type: Array,
			value: null,
			observer: 'changeHelpList'
		},
		show: {
			type: Boolean,
			value: true,
      observer: 'onShow'
		},
		maxNum: {
			type: Number,
			value: 5
		},
    aid: {
      type: null,
      value: '',
      observer: 'changeActivity'
    }
	},
	data: {
		helpNum: 0,
		nohelpList: []
	},

  ready: function () {
    console.log('ready')
  },

	methods: {
    onShow: function (newVal, oldVal, changedPath) {
      if (newVal) {
        app.globalData.shareInfo = {
          stype: 1,
          __reserved: true,
          title: '我在7k7k游戏打榜！快来助我一把啊！',
          path: '/pages/rank/index?'+ 
              'aid=' + this.data.aid +
              '&stype=1' +
              '&fuid=' + app.globalData.userInfo.uid + 
            '&fname=' + encodeURIComponent(app.globalData.userInfo.name) + 
            '&favatar=' + encodeURIComponent(app.globalData.userInfo.avatar)
        };
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#367be9'
        })
      } else {
        app.globalData.shareInfo = {
          stype: 0
        };
        wx.setNavigationBarColor({
          frontColor: this.data.navBarFontColor,
          backgroundColor: this.data.navBarBGColor
        })
      }
    },
    changeActivity: function (newVal, oldVal, changedPath) {

    },
		changeHelpList: function() {
			var len = this.data.helpList.length
			var nohelpList = []
			for (var i = len; i < this.data.maxNum; i++) {
				nohelpList.push(1)
			}
			this.setData({
				helpNum: len,
				nohelpList: nohelpList,
			})
		},

		hideHelp: function() {
			this.setData({
				show: false
			})
		},

		handleDel: function(e) {
			var me = this;
			wx.showModal({
				title: '',
				content: '确定删除此好友的助力分？',
				showCancel: true,
				confirmColor: '#ff8130',
				success: function(res) {
					if (res.confirm) {
						//TODO:掉接口删除
						var duid = e.currentTarget.dataset.uid
						var index = e.currentTarget.dataset.index
						http.post('/gamebox/rank/delassist', {
							aid: app.globalData.zhuliAid,
							duid: duid,
						}, function(data) {
							// console.log(data)
							var helpList = me.data.helpList.concat();
							helpList.splice(index, 1)
							me.setData({
								helpList: helpList,
							});
							me.triggerEvent('deleteHelp')
						}, function(code, msg) {
							wx.showToast({
								title: msg || '删除失败',
								icon: 'none'
							});
						})
					}
				}
			})
		},

	}
})