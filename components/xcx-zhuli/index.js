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
		show: {
			type: Boolean,
			value: true,
			observer: 'onShow'
		},
		aid: {
			type: null,
			value: '',
			observer: 'changeActivity'
		},
		// maxNum: {
		// 	type: Number,
		// 	value: 5
		// },
	},
	data: {
		helpList: wx.getStorageSync('helpList'),
		assistText: []
	},

	// ready: function() {
	// 	console.log('ready')
	// },

	methods: {
		onShow: function(newVal, oldVal, changedPath) {
			if (this.data.show) {
				this.loadRankData(this.data.aid)
			}

			if (newVal) {
				wx.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#367be9'
				})
			} else {
				wx.setNavigationBarColor({
					frontColor: this.data.navBarFontColor,
					backgroundColor: this.data.navBarBGColor
				})
			}
		},
		changeActivity: function(newVal, oldVal, changedPath) {
			this.loadRankData(this.data.aid)
		},
		loadRankData: function(aid) {
			wx.showLoading({
				title: '数据加载中'
			});
			var me = this;
			http.get('/gamebox/activity/rank', {
				// fuid: fuid,
				aid: aid,
				page: 1
			}, function(data) {
				wx.hideLoading();
				me.setData({
					helpList: data.assistance,
					assistText: data.assistText
				});
				wx.setStorageSync('helpList', data.assistance);
			}, function(code, msg) {
				wx.hideLoading();
				wx.showToast({
					title: msg || '数据加载失败',
					icon: 'none'
				});
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