var util = require("../../util/util");
var http = require("../../util/http");
Component({
	externalClasses: [],
	properties: {
		danmuList: {
			type: Array,
			value: null
		},
		width: {
			type: Number,
			value: null
		},
		height: {
			type: Number,
			value: null
		},
	},
	// 私有数据，可用于模版渲染
	data: {
		// // [{top:'',playState:''},{top:'',playState:''}]
		textProps: []
	},
	attached: function() {
		var textProps = [];
		for (var i = 0; i < this.data.danmuList.length; i++) {
			//随机位置
			var top = Math.floor(Math.random() * (this.data.height - 20)) + 'px'
			textProps.push({
				top: top,
				playState: true
			});
		}
		this.setData({
			textProps: textProps
		})
		//循环播放，播放暂停

	},
	methods: {
		onTap: function(e) {
			var text = e.currentTarget.dataset.text;
			// var myEventDetail = {} // detail对象，提供给事件监听函数
			// var myEventOption = {} // 触发事件的选项
			this.triggerEvent('clickText', {
				text: text
			})
		}
	}
})