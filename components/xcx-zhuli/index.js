var util = require("../../util/util");
var http = require("../../util/http");

var app = getApp();

Component({
	externalClasses: [],
	properties: {
		helpList: {
			type: Array,
			value: null,
			observer: 'changeHelpList'
		},
		show: {
			type: Boolean,
			value: true
		},
		maxNum: {
			type: Number,
			value: 5
		}
	},
	data: {
		helpNum: 0,
		nohelpList: []
	},

	methods: {
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