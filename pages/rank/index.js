var QKPage = require("../../libs/page");
var http = require("../../util/http");
var util = require("../../util/util");
var app = getApp();

QKPage({
	data: {
		tabs: [

		],
		imgUrls: [
			'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
			'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
			'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
		],
		rankList: [{
			ranking: '1',
			name: "韩梅梅",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '2',
			score: '3000',
		}, {
			ranking: '2',
			name: "舒克",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}, {
			ranking: '3',
			name: "贝塔",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}, {
			ranking: '4',
			name: "李雷",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}, {
			ranking: '5',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}],
		activeIndex: 0,
		lists: [{
			index: '1',
			content: "现在发布公告一则"
		}, {
			index: '2',
			content: "事件处理函数事件处理函数"
		}, {
			index: '3',
			content: "获取应用实例获取应用实例获取应用实例获取应用实例"
		}, {
			index: '4',
			content: "事件处理函数事件处理函数"
		}, ],
		game_wuxianlou: {
			appId: "wx5b6b8f9a7aad9945",
			bg: "https://snsgame.uimg.cn/video/game/wxl/WechatIMG29.jpeg",
			desc: "攀登无限楼，收获白富美",
			direction: 0,
			extra: "",
			gameId: 1,
			icon: "https://snsgame.uimg.cn/video/game/wxl/logo.jpg",
			linkMode: 1,
			logo: "https://snsgame.uimg.cn/video/game/wxl/logo.jpg",
			mode: 1,
			name: "无限楼",
			path: "",
			pics: ["https://snsgame.uimg.cn/video/game/wxl/pic1.jpg", "https://snsgame.uimg.cn/video/game/wxl/pic2.jpg", "https://snsgame.uimg.cn/video/game/wxl/pic3.jpg"],
			playerNum: "10万",
			poster: "https://snsgame.uimg.cn/video/game/wxl/wxl.jpg",
			tags: ["休闲"],
			type: 1,
			vshow: false,
			vsrc: ""
		},
		//弹幕列表
		danmuList: [{
			text: '第 1s 出现的弹幕',
			// color: '#ff0000',
			duration: 30, //多少秒完成
		}, {
			text: '第 3s 出现的弹幕',
			color: '#ff00ff',
			duration: 5
		}, {
			text: '第 1s 出现的弹幕',
			color: '#ff0000',
			duration: 10,
		}]
	},
	clickTab: function(e) {
		this.setData({
			activeIndex: e.currentTarget.dataset.index,
		});
	},
	changeSwiper: function(e) {
		this.setData({
			activeIndex: e.detail.current
		})
	},
	// clickOne: function(e) {
	// 	var id = e.currentTarget.dataset.id
	// 	console.log(id)
	// 	// wx.navigateTo({
	// 	// 	url: '',
	// 	// })
	// 	wx.switchTab({
	// 		url: '/pages/index/index',
	// 	})
	// },
	clickRule: function() {
		wx.showModal({
			title: '活动规则',
			content: '活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则',
			showCancel: false,
			confirmColor: '#ff8130',
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定')
				}
			}
		})
	},
	onLoad: function(options) {
		// console.log(options)
		// console.log(app.globalData)
	}
})