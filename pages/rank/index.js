var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();


QKPage({
	data: {
    aid: '',
		user: app.globalData.userInfo,
		pageShow: false,
		banner: '../../images/default-banner.png',
		playerNum: '0',
		rules: '',
		maskColor: 'rgba(0,0,0,0.1)',
		uid: app.globalData.userInfo ? app.globalData.userInfo.uid : 0,
		name: app.globalData.userInfo ? app.globalData.userInfo.name : '-',
		avatar: app.globalData.userInfo ? app.globalData.userInfo.avatar : '../../images/defaultavatar.png',
		rank: 0,
		score: 0,
		showInvitePop: false,
		ranks: [],
		intoGame: {},
    game4Zhuli: {},
    zhuliInfo: {},
		helpShow: false,
		helpList: [],
		danmuList: [],
		page: 1,
		gotohelpShow: false,
		assistNumOut: false, //助力次数已满
		isAssistanted: false, //是否助力过
		assistanceNum: 0,
		scrollHeight: 0,
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
      success: function (res) {
        var ratio = res.windowWidth / 750;
        var scrollHeight = res.windowHeight - (20 + 300 + 60 + 120) * ratio;
        me.setData({
          scrollHeight: scrollHeight
        });
      },
      fail: function () {
        me.setData({
          scrollHeight: 300
        });
      }
    })
		if (app.globalData.userInfo) {
			this.loadRankData(true, aid);
		}
	},
  onShow: function () {
    this.showAssistPop();
  },
  onHide: function () {
    this.setData({
      pageShow: false
    });
  },
	onLogin: function() {
    this.showAssistPop();
		this.loadRankData(true, this.data.aid);
		this.setData({
			uid: app.globalData.userInfo.uid,
			name: app.globalData.userInfo.name,
			avatar: app.globalData.userInfo.avatar,
		})
	},

  showAssistPop: function () {
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
      }, function (game) {
        me.setData({
          game4Zhuli: game
        });
      }, function (code, msg) {

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
			// page: refresh ? 1 : me.data.page
			page: 1
		}, function(data) {
			wx.hideLoading();
			var game = {}
			game.appId = data.appId
			game.gameId = data.gameId
			game.mode = data.mode
			game.path = data.path
			var ranks = refresh ? [].concat(data.ranks) : me.data.ranks.concat(data.ranks)
			me.setData({
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
			wx.showToast({
				title: msg || '数据加载失败',
				icon: 'none'
			});
		})
	},

	scrolltoLower: function() {
		console.log('onReachBottom page:' + this.data.page)
		this.loadRankData(false, this.data.aid);
	},

	clickRule: function() {
		var rules = this.data.rules.join(";")
		wx.showModal({
			title: '活动规则',
			content: rules,
			showCancel: false,
			confirmColor: '#ff8130',
		})
	},

	onHelp: function(e) {
		this.setData({
			helpShow: true
		})
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