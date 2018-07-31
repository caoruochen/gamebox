var util = require("../../util/util");
var http = require("../../util/http");

var app = getApp();

var cachedHelpers = {};

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
		activity: {
			type: Object,
			value: null
		}
	},
	data: {
		assistances: [],
	},

	methods: {
		onShow: function(newVal, oldVal, changedPath) {
			if (newVal) {
				if (this.data.activity && cachedHelpers[this.data.activity.aid]) {
					this.setData({
						assistances: cachedHelpers[this.data.activity.aid]
					});
				}
				this.getAssistance();
				app.globalData.shareInfo = {
					stype: 1,
					__reserved: true,
          title: '搞了半天过不去，看样子得你出马了！',
          imageUrl: '/images/share2.jpg',
					path: '/pages/hit-rank/index?' +
            'spage=/pages/rank/index' +
						'&aid=' + this.data.activity.aid +
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
		getAssistance: function() {
			wx.showLoading({
				title: '数据加载中'
			});
			var me = this;
			http.get('/gamebox/activity/assists', {
				aid: this.data.activity.aid
			}, function(data) {
				wx.hideLoading();
				me.setData({
					assistances: data
				});
				if (data && data.length > 0) {
					cachedHelpers[me.data.activity.aid] = data;
				}
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

		inviteNotice: function() {
			wx.showModal({
				title: '最多邀请5位好友',
				content: '可以删除分数较低的好友后，重新邀请',
				showCancel: false,
				confirmText: '关闭'
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
						var duid = e.currentTarget.dataset.uid
						var index = e.currentTarget.dataset.index
						http.post('/gamebox/rank/delassist', {
							aid: me.data.activity.aid,
							duid: duid,
						}, function(data) {
							var assistances = me.data.assistances.concat();
							assistances.splice(index, 1);
							me.setData({
								assistances: assistances,
							});
							me.triggerEvent('updateHelp');
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