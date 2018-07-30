var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();


QKPage({
	data: {
    user: app.globalData.userInfo,
    pageShow: false,
		banner: '../../images/default-banner.png',
		playerNum: '0',
		rules: '',
		uid: app.globalData.userInfo ? app.globalData.userInfo.uid : 0,
		name: app.globalData.userInfo ? app.globalData.userInfo.name : '-',
		avatar: app.globalData.userInfo ? app.globalData.userInfo.avatar : '../../images/defaultavatar.png',
		rank: 0,
		score: 0,
		ranks: [],
		intoGame: {
			appId: "wx530202348351e73c",
			gameId: 1,
			mode: 1,
			path: "pages/index/index?__qk_rank_ticket=u1383",
		},

		activeIndex: 0,
		helpShow: false,
		helpList: [],
		//弹幕列表
		danmuList: [],
		aid: '',
		status: false, //状态标识,onshow是否调用更新排名接口
		page: 1,
		gotohelpShow: false,
		fuid: null, //助力的好友uid
		fname: '', //助力的好友昵称
		assistNumOut: false, //助力次数已满
		isAssistanted: false, //是否助力过
		animationData: {},
	},

	onLoad: function(options) {
		// console.log('options', options)
		// console.log('onLoad', app.globalData)
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
	},
	onLogin: function() {
		// TODO: 登陆后拉取用户数据
		// console.log('onLogin', app.globalData.userInfo)
		this.loadRankData(true, this.data.aid, this.data.fuid);
		this.setData({
			uid: app.globalData.userInfo.uid,
			name: app.globalData.userInfo.name,
			avatar: app.globalData.userInfo.avatar,
		})
	},
	onShow: function() {
    this.setData({
      pageShow: true
    });
		app.globalData.zhuliAid = null;
		if (this.data.status) {
			//延迟 结果查询，显示结果
			setTimeout(this.getMyRank, 1000)
			this.setData({
				status: false
			})
		}
	},
  onHide: function () {
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
		}, function(data) {
			wx.hideLoading();
			wx.stopPullDownRefresh();
			var game = {}
			game.appId = data.appId
			game.gameId = data.gameId
			game.mode = data.mode
			game.path = data.path
			var ranks = refresh ? [].concat(data.ranks) : me.data.ranks.concat(data.ranks)
			me.setData({
				// uid: data.uid,
				banner: data.banner,
				playerNum: data.playerNum,
				rules: data.rules,
				rank: data.rank,
				score: data.score,
				ranks: ranks,
				intoGame: game,
				helpList: data.assistance,
				assistNumOut: data.assistNumOut || false,
				isAssistanted: data.isAssistanted || false,
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
				//分数更新动画
				var animation = wx.createAnimation({
					transformOrigin: "50% 80%",
					duration: 1000,
					timingFunction: 'ease',
				})
				animation.scale(2, 2).step()
				animation.scale(1, 1).step()
				me.setData({
					rank: data.rank,
					score: data.score,
					animationData: animation.export()
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
	onReachBottom: function(e) {
		// console.log('onReachBottom page:' + this.data.page)
		this.loadRankData(false, this.data.aid, this.data.fuid);
	},


	changeStatus: function() {
		this.setData({
			status: true
		})
	},

	clickRule: function() {
		wx.showModal({
			title: '活动规则',
			content: this.data.rules,
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

	// onChallenge: function() {
	// 	wx.navigateTo({
	// 		url: '/pages/challenge/index',
	// 	})
	// },
	// //弹幕点击事件
	// clickDanmu: function(e) {
	// 	console.log(e.detail.text)
	// },

  onStartGame: function () {
    app.globalData.startGame = true;
  },
})