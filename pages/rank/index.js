var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();


QKPage({
	data: {
		user: app.globalData.userInfo,
		banner: '../../images/default-banner.png',
		playerNum: '0',
		rules: '',
		maskColor: 'rgba(0,0,0,0.1)',
		uid: app.globalData.userInfo ? app.globalData.userInfo.uid : 0,
		name: app.globalData.userInfo ? app.globalData.userInfo.name : '-',
		avatar: app.globalData.userInfo ? app.globalData.userInfo.avatar : '../../images/defaultavatar.png',
		rank: 0,
		score: 0,
		// ranks: [],
		ranks: [{
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}, {
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}, {
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}, {
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}, {
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}, {
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}, {
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}, {
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}, {
			assistanceNum: "0",
			avatar: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132",
			name: "曹若晨",
			rank: 1,
			score: 0
		}],
		intoGame: {
			appId: "wx530202348351e73c",
			gameId: 1,
			mode: 1,
			path: "pages/index/index?__qk_rank_ticket=u1383",
		},
		helpShow: false,
		helpList: [],
		danmuList: [],
		aid: '',
		status: false, //状态标识,onshow是否调用更新排名接口
		page: 1,
		gotohelpShow: false,
		fuid: null, //助力的好友uid
		fname: '', //助力的好友昵称
		assistNumOut: false, //助力次数已满
		isAssistanted: false, //是否助力过
		assistanceNum: 0,
		scrollHeight: 0,
	},

	onLoad: function(options) {
		console.log('options', options)
		console.log('onLoad', app.globalData)
		var aid = options.aid || '1';
		var type = options.type;
		var fuid = options.fuid || null;
		var fname = options.fname;

		this.setData({
			aid: aid,
		});
		if (type == '1') {
			this.setData({
				gotohelpShow: true,
				fuid: fuid,
				fname: fname
			});
		}
		if (app.globalData.userInfo) {
			this.loadRankData(true, aid, fuid);
			this.setData({
				uid: app.globalData.userInfo.uid,
				name: app.globalData.userInfo.name,
				avatar: app.globalData.userInfo.avatar,
			})
		}

		// var me = this;
		var res = wx.getSystemInfoSync();
		var ratio = app.globalData.wwidth / 750;
		console.log(res, ratio)
		var scrollHeight = res.windowHeight - (20 + 300 + 60 + 120) * ratio;
		console.log(scrollHeight)
		// var scrollHeight = res.windowHeight * ratio - 20 - 300 - 60 - 120;
		this.setData({
			scrollHeight: scrollHeight
		});
	},
	onLogin: function() {
		// TODO: 登陆后拉取用户数据
		console.log('onLogin', app.globalData.userInfo)
		this.loadRankData(true, this.data.aid, this.data.fuid);
		this.setData({
			uid: app.globalData.userInfo.uid,
			name: app.globalData.userInfo.name,
			avatar: app.globalData.userInfo.avatar,
		})
	},
	onShow: function() {
		app.globalData.zhuliAid = null;
		if (this.data.status) {
			//延迟 结果查询，显示结果
			setTimeout(this.getMyRank, 1000)
			this.setData({
				status: false
			})
		}
	},

	loadRankData: function(refresh, aid, fuid) {
		wx.showLoading({
			title: '数据加载中'
		});
		var me = this;
		http.get('/gamebox/activity/rank', {
			fuid: fuid,
			aid: aid,
			// page: refresh ? 1 : me.data.page
			page: 1
		}, function(data) {
			wx.hideLoading();
			wx.stopPullDownRefresh();
			var game = {}
			game.appId = data.appId
			game.gameId = data.gameId
			game.mode = data.mode
			game.path = data.path
			var ranks = refresh ? [].concat(data.ranks) : me.data.ranks.concat(data.ranks)
			// var ranks = me.data.ranks.concat(data.ranks)
			me.setData({
				// uid: data.uid,
				banner: data.banner,
				playerNum: data.playerNum,
				rules: data.rules,
				rank: data.rank,
				score: data.score || 0,
				ranks: ranks,
				intoGame: game,
				helpList: data.assistance,
				assistNumOut: data.assistNumOut || false,
				isAssistanted: data.isAssistanted || false,
				assistanceNum: data.assistance.length,
				maskColor: data.mask,
				danmuList: data.danmaku,
			});
			if (data.ranks.length != 0) {
				var page = refresh ? 2 : me.data.page + 1
				me.setData({
					page: page
				})
			}
		}, function(code, msg) {
			wx.hideLoading();
			wx.stopPullDownRefresh();
			wx.showToast({
				title: msg || '数据加载失败',
				icon: 'none'
			});
		})
	},

	getMyRank: function() {
		wx.showLoading({
			title: '分数更新'
		});
		var me = this;
		http.get('/gamebox/activity/rankinfo', {
			aid: me.data.aid,
		}, function(data) {
			wx.hideLoading();
			// console.log(data)
			if (data.length != 0 && data.score != me.data.score) {
				me.setData({
					rank: data.rank,
					score: data.score,
				});
			}
		}, function(code, msg) {
			wx.hideLoading();
			wx.showToast({
				title: msg || '分数刷新失败',
				icon: 'none'
			});
		})
	},

	onPullDownRefresh: function() {
		this.loadRankData(true, this.data.aid, this.data.fuid);
		this.setData({
			ranks: [],
			page: 1,
		})
	},
	// onReachBottom: function(e) {
	// 	console.log('onReachBottom page:' + this.data.page)
	// 	this.loadRankData(false, this.data.aid, this.data.fuid);
	// },
	scrolltoLower: function() {
		console.log('onReachBottom page:' + this.data.page)
		this.loadRankData(false, this.data.aid, this.data.fuid);
	},

	changeStatus: function() {
		this.setData({
			status: true
		})
	},

	clickRule: function() {
		var rules = this.data.rules.join(';')
		wx.showModal({
			title: '活动规则',
			content: rules,
			showCancel: false,
			confirmColor: '#ff8130',
		})
	},

	onHelp: function(e) {
		app.globalData.zhuliAid = e.currentTarget.dataset.aid;
		this.setData({
			helpShow: true
		})
	},

	hideGotohelp: function() {
		this.setData({
			gotohelpShow: false
		})
	},

	deleteHelp: function() {
		// 删除助力，刷新我的分数
		this.getMyRank()
	},

	//自定义转发字段
	onShareAppMessage: function(res) {
		return {
			title: '我在7k7k游戏打榜！快来助我一把啊！',
			path: '/pages/rank/index?aid=' + app.globalData.zhuliAid + '&fuid=' + app.globalData.userInfo.uid + '&fname=' + app.globalData.userInfo.name + '&type=1',
			url: '../../images/share.jpg'
		}
	},

	// //弹幕点击事件
	// clickDanmu: function(e) {
	// 	console.log(e.detail.text)
	// },
})