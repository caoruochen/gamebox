var util = require("../../util/util");
var http = require("../../util/http");

var app = getApp();

Component({
	externalClasses: [],
	properties: {
		helpList: {
			type: Array,
			value: null,
			observer: 'changeHelpList'
		},
		show: {
			type: Boolean,
			value: true
		},
    maxNum: {
      type: Number,
      value: 5
    }
	},
	data: {
		helpNum: 0,
	},

	attached: function() {
		this.changeHelpList();
	},

	methods: {
		changeHelpList: function() {
			// console.log("changeHelpNum")
			var len = this.data.helpList.length
			//还差助力人数
		  var list = this.data.helpList;
			if (len < this.data.maxNum) {
				for (var i = len; i < this.data.maxNum; i++) {
					list.push(1)
				}
				this.setData({
					helpList: list
				})
			}
      var helpNum = list.length;
      for (var i=0; i<list.length; i++) {
        if (list[i] === 1) {
          helpNum--;
        }
      }
      this.setData({
        helpNum: helpNum
      });
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
