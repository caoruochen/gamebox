var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();


QKPage({
	data: {
		user: app.globalData.userInfo,
		pageShow: false,
		activity: {},
		intoGame: {},
		ranks: [],
		rank: 0,
		score: 0,
		showInvitePop: false,
		helpShow: false,
		assistanceNum: 0,
		aid: '',
		status: false, //状态标识,onshow是否调用更新排名接口
		page: 1,
		gotohelpShow: false,
		fuid: null, //助力的好友uid
		fname: '', //助力的好友昵称
		// assistNumOut: false, //助力次数已满
		// isAssistanted: false, //是否助力过
		scrollHeight: 0,
	},

	onLoad: function(options) {
		console.log('options', options)
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
				user: app.globalData.userInfo
			})
		}

		var res = wx.getSystemInfoSync();
		var ratio = res.windowHeight / 750;
		var scrollHeight = res.windowHeight - (300 + 60 + 120) * ratio;
		console.log(scrollHeight)
		this.setData({
			scrollHeight: scrollHeight
		});
	},
	onLogin: function() {
		// TODO: 登陆后拉取用户数据
		this.loadRankData(true, this.data.aid, this.data.fuid);
		this.setData({
			user: app.globalData.userInfo
		})
	},
	onShow: function() {
		// console.log(app.globalData.showParams)
		var params = app.globalData.showParams;
		var data = {
			pageShow: true
		}
		if (params && params.query && params.query.stype == 1) {
			data.showInvitePop = true
		}
		// console.log(data)
		this.setData(data);
		app.globalData.zhuliAid = null;
		if (this.data.status) {
			//延迟 结果查询，显示结果
			setTimeout(this.getMyRank, 1000)
			this.setData({
				status: false
			})
		}
	},
	onHide: function() {
		this.setData({
			pageShow: false
		});
	},

	loadRankData: function(refresh, aid, fuid) {
		wx.showLoading({
			title: '数据加载中'
		});
		var me = this;
		http.get('/gamebox/activity/rank', {
			fuid: fuid,
			aid: aid,
			page: refresh ? 1 : me.data.page
			// page: 1
		}, function(data) {
			wx.hideLoading();
			wx.stopPullDownRefresh();
			var ranks = refresh ? [].concat(data.rankslist.list) : me.data.ranks.concat(data.rankslist.list)
			me.setData({
				activity: data.activityInfo,
				intoGame: data.gameInfo,
				rank: data.userInfo.rank,
				score: data.userInfo.score,
				ranks: ranks,
				assistanceNum: data.assistlist.list.length,
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
		var rules = this.data.activity.rules.join(';')
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

	onStartGame: function() {
		app.globalData.startGame = true;
	},
	onCloseInvitePop: function() {
		this.setData({
			showInvitePop: false
		})
	}
})