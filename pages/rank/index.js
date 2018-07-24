var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();

QKPage({
	data: {
		banner: '../../images/default-banner.png',
		playerNum: '0',
		rules: '',
		intoGame: {
			// appId: "wx530202348351e73c",
			// bg: "https://snsgame.uimg.cn/video/game/wxl/WechatIMG29.jpeg",
			// desc: "攀登无限楼，收获白富美",
			// direction: 0,
			// extra: "",
			// gameId: 1,
			// icon: "https://snsgame.uimg.cn/video/game/wxl/logo.jpg",
			// linkMode: 1,
			// logo: "https://snsgame.uimg.cn/video/game/wxl/logo.jpg",
			// mode: 1,
			// name: "世界杯预言+",
			// path: "pages/index/index?__qk_rank_ticket=u" + app.globalData.userInfo.uid,
			// pics: ["https://snsgame.uimg.cn/video/game/wxl/pic1.jpg", "https://snsgame.uimg.cn/video/game/wxl/pic2.jpg", "https://snsgame.uimg.cn/video/game/wxl/pic3.jpg"],
			// playerNum: "10万",
			// poster: "https://snsgame.uimg.cn/video/game/wxl/wxl.jpg",
			// tags: ["休闲"],
			// type: 1,
			// vshow: false,
			// vsrc: ""
		},
		// activity: {},
		personal: {
			// 'uid': 0,
			'score': 0,
			'rank': 0,
			'options': [] //控制按钮的显示
		},
		ranks: [{
			name: "韩梅梅",
			rank: '1',
			score: '3000',
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
		}, {
			rank: '2',
			name: "舒克",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '300',
		}, {
			rank: '3',
			name: "贝塔",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '30',
		}, {
			rank: '4',
			name: "李雷",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
		}, {
			rank: '5',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
		}, {
			rank: '6',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
		}, {
			rank: '7',
			name: "李雷",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
		}, {
			rank: '8',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
		}, {
			rank: '9',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
		}, {
			rank: '10',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
		}],

		activeIndex: 0,
		helpShow: false,
		helpList: [{
			uid: '38',
			name: "韩梅梅",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
			help: '50',
		}, {
			uid: '39',
			name: "韩梅梅",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '3000',
			help: '50',
		}],
		//弹幕列表
		danmuList: [{
			text: '第 1s 出现的弹幕第 1s 出现的弹幕',
			// color: '#ff0000',
			// time: 1, 
		}, {
			text: '第 5s 出现的弹幕',
			color: '#ff00ff',
		}, {
			text: '第 10s 出现的弹幕',
			color: '#ff0000',
		}]
	},


	onLoad: function(options) {
		console.log(options)
		// console.log(app.globalData)
		var aid = options.aid;
		this.loadRankData(aid);
	},
	loadRankData: function(aid) {
		wx.showLoading({
			title: '数据加载中'
		});
		var me = this;
		http.get('/gamebox/activity/rank', {
			aid: (aid && aid != 'undefined') || '1'
		}, function(data) {
			wx.hideLoading();
			wx.stopPullDownRefresh();
			console.log(data)
			me.setData({
				//处理数据
				banner: data.activity.banner,
				// playerNum: data.playerNum,
				playerNum: data.activity.playerNum,
				rules: data.activity.rules,
				personal: data.personal,
				ranks: data.ranks,
			});
		}, function(code, msg) {
			wx.hideLoading();
			wx.stopPullDownRefresh();
			wx.showToast({
				title: msg || '数据加载失败',
				icon: 'none'
			});
		})
	},
	// clickTab: function(e) {
	// 	this.setData({
	// 		activeIndex: e.currentTarget.dataset.index,
	// 	});
	// },
	clickRule: function() {
		wx.showModal({
			title: '活动规则',
			content: this.data.rules,
			showCancel: false,
			confirmColor: '#ff8130',
			success: function(res) {
				if (res.confirm) {
					// console.log('用户点击确定')
				}
			}
		})
	},
	onChallenge: function() {
		wx.navigateTo({
			url: '/pages/challenge/index',
		})
	},

	//弹幕点击事件
	clickDanmu: function(e) {
		console.log(e.detail.text)
	},

	onHelp: function() {
		this.setData({
			helpShow: true
		})
	},
})