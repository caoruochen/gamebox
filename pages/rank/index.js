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
			score: '300',
		}, {
			ranking: '3',
			name: "贝塔",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '30',
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
		}, {
			ranking: '6',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}, {
			ranking: '7',
			name: "李雷",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}, {
			ranking: '8',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}, {
			ranking: '9',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}, {
			ranking: '10',
			name: "李雷理",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			gender: '1',
			score: '3000',
		}],
		helpList: [{
			name: "韩梅梅",
			avatar: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epoLgQ007f6jkTJ5n0RpHAwWR56OOlTuboiaC0ucYEQ3BKMJxwPZ9xlvgibwrCS7YSANms02icYbicyTg/132',
			score: '300',
			help: '20',
		}],
		nohelpList: [],
		helpShow: true,
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
	onChallenge: function() {
		wx.navigateTo({
			url: '/pages/challenge/index',
		})
	},
	onHelp: function() {
		console.log("onhelp")
		this.setData({
			helpShow: true
		})
	},
	hideHelp: function() {
		console.log("hideHelp")
		this.setData({
			helpShow: false
		})
	},
	catch: function() {
		// console.log("阻止时间冒泡")
	},

	onLoad: function(options) {
		// console.log(options)
		// console.log(app.globalData)
		//没有帮助的人数
		if (this.data.helpList.length < 5) {
			var len = this.data.helpList.length
			var list = this.data.nohelpList.concat() //拷贝数组
			for (var i = 0; i < 5 - len; i++) {
				list.push(1)
			}
			this.setData({
				nohelpList: list
			})
		}
	}
})