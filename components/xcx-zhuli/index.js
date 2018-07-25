var util = require("../../util/util");
var http = require("../../util/http");

Component({
	externalClasses: [],
	properties: {
		helpList: {
			type: Array,
			value: null
		},
		show: {
			type: Boolean,
			value: true
		}
	},
	data: {
		helpNum: 0,
	},

	attached: function() {
		this.changeHelpNum();
	},

	methods: {
		changeHelpNum: function() {
			var len = this.data.helpList.length
			this.setData({
				helpNum: len
			})
			//还差助力人数
			if (len < 5) {
				var list = this.data.helpList.concat()
				for (var i = 0; i < 5 - len; i++) {
					list.push(1)
				}
				this.setData({
					helpList: list
				})
			}
		},

		hideHelp: function() {
			this.setData({
				show: false
			})
		},

		handleDel: function(e) {
			wx.showModal({
				title: '',
				content: '确定删除此好友的助力分？',
				showCancel: true,
				confirmColor: '#ff8130',
				success: function(res) {
					if (res.confirm) {
						//TODO:掉接口删除
					}
				}
			})
		},

	}
})