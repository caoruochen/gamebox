var util = require("../../util/util");
var http = require("../../util/http");
Component({
	externalClasses: [],
	properties: {
		danmuList: {
			type: Array,
			value: null,
			observer: 'changeList'
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
	data: {
		textProps: []
	},

	methods: {
		changeList: function() {
			var textProps = [];
			for (var i = 0; i < this.data.danmuList.length; i++) {
				//随机位置
				var top = Math.floor(Math.random() * (this.data.height - 20)) + 'px'
				textProps.push({
					top: top,
				});
			}
			this.setData({
				textProps: textProps
			})
		},
		onTap: function(e) {
			var text = e.currentTarget.dataset.text;
			this.triggerEvent('clickText', {
				text: text
			})
		}
	}
})