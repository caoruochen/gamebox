var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();


QKPage({
	data: {
		aid: '',
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
		page: 1,
		// gotohelpShow: false,
		// fuid: null, //助力的好友uid
		// fname: '', //助力的好友昵称
		// assistNumOut: false, //助力次数已满
		// isAssistanted: false, //是否助力过
		game4Zhuli: {},
		zhuliInfo: {},
		scrollHeight: 0,
		ruleShow: false,
	},

	onLoad: function(options) {
		console.log(options)
		var aid = options.aid
		if (!aid) {
			wx.showToast({
				title: '活动参数错误',
				icon: 'none'
			})
			return;
		}
		this.setData({
			aid: aid
		});
		var me = this
		wx.getSystemInfo({
			success: function(res) {
				var ratio = res.windowWidth / 750;
				var scrollHeight = res.windowHeight - (20 + 300 + 60 + 120) * ratio;
				me.setData({
					scrollHeight: scrollHeight
				});
			},
			fail: function() {
				me.setData({
					scrollHeight: 300
				});
			}
		})
		if (app.globalData.userInfo) {
			this.loadRankData(true, aid);
		}
	},
	onShow: function() {
		this.showAssistPop();
	},
	onHide: function() {
		this.setData({
			pageShow: false
		});
	},
	onLogin: function() {
		this.showAssistPop();
		this.loadRankData(true, this.data.aid);
		this.setData({
			user: app.globalData.userInfo
		})
	},

	showAssistPop: function() {
		var uid = app.globalData.userInfo ? app.globalData.userInfo.uid : -1;
		if (uid < 0) {
			return;
		}
		var params = app.globalData.showParams;
		var data = {
			pageShow: true
		}
		if (params && params.query &&
			params.query.stype == 1 &&
			params.query.fuid &&
			params.query.fuid != uid) {
			data.showInvitePop = true
		}
		app.globalData.showParams.query.stype = -1;
		if (data.showInvitePop) {
			this.setData({
				zhuliInfo: {
					fuid: params.query.fuid,
					fname: decodeURIComponent(params.query.fname),
					favatar: decodeURIComponent(params.query.favatar),
				}
			})
			var me = this;
			http.get('/gamebox/activity/ticket', {
				aid: params.query.aid,
				fuid: params.query.fuid
			}, function(game) {
				me.setData({
					game4Zhuli: game
				});
			}, function(code, msg) {

			});
		}
		this.setData(data);
	},

	loadRankData: function(refresh, aid) {
		wx.showLoading({
			title: '数据加载中'
		});
		var me = this;
		http.get('/gamebox/activity/rank', {
			aid: aid,
			page: refresh ? 1 : me.data.page
		}, function(data) {
			wx.hideLoading();
			wx.stopPullDownRefresh();
			me.updateData(refresh, data);
		}, function(code, msg) {
			wx.hideLoading();
			wx.showToast({
				title: msg || '数据加载失败',
				icon: 'none'
			});
		})
	},

	updateData: function(refresh, data) {
		var ranks = refresh ? [].concat(data.rankslist.list) : this.data.ranks.concat(data.rankslist.list)
		data.activityInfo.score = data.userInfo.score;
		data.activityInfo.rank = data.userInfo.rank;
		data.activityInfo.rank_text = data.userInfo.rank_text;
		data.activityInfo.tips = data.userInfo.tips;
		data.activityInfo.lastScore = data.userInfo.lastScore;

		var data0 = {
			activity: data.activityInfo,
			intoGame: data.gameInfo,
			rank: data.userInfo.rank,
			score: data.userInfo.score,
			ranks: ranks,
			assistanceNum: data.userInfo.assistance.length
		};

		if (data.rankslist.list.length != 0) {
			var page = refresh ? 2 : this.data.page + 1
			data0.page = page;
		}
		this.setData(data0);
	},

	scrolltoLower: function() {
		console.log('onReachBottom page:' + this.data.page)
		this.loadRankData(false, this.data.aid);
	},

	clickRule: function() {
		console.log(this.data.activity);
		this.setData({
			ruleShow: true
		})
	},
	cancleRule: function() {
		this.setData({
			ruleShow: false
		})
	},

	onHelp: function(e) {
		this.setData({
			helpShow: true,
		})
	},

	onStartGame: function(e) {
		var activity = e.detail;
		app.globalData.startGame = true;
	},
	onCloseInvitePop: function() {
		this.setData({
			showInvitePop: false
		})
	},
	onResultUpdate: function(e) {
		var data = e.detail;
		this.updateData(true, data);
	},
	updateHelp: function() {
		// console.log('updateHelp')
		this.loadRankData(true, this.data.aid);
	}
})