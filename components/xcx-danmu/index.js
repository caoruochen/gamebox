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
			type: String,
			value: '100%'
		},
		height: {
			type: String,
			value: '100%'
		}
	},
	// 私有数据，可用于模版渲染
	data: {
		tops: []
	},
	attached: function() {
		var topsTemp = [];
		for (var i = this.data.danmuList.length - 1; i >= 0; i--) {
			var top = Math.floor(Math.random() * 70) + '%'
			topsTemp.push(top);
		}
		this.setData({
			tops: topsTemp
		})
	},
	methods: {
		// getRandomColor: function() {
		// 	var rgb = []
		// 	for (var i = 0; i < 3; ++i) {
		// 		var color = Math.floor(Math.random() * 256).toString(16)
		// 		color = color.length == 1 ? '0' + color : color
		// 		rgb.push(color)
		// 	}
		// 	console.log('#' + rgb.join(''))
		// 	return '#' + rgb.join('')
		// },

	}
})