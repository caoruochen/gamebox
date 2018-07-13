var SaveRecentGame = function(options){
	options = options || {};
	this.key = options.key || 'recentGameList';
	this.maxStorage = options.maxStorage || 20;
	var recentGameList = wx.getStorageSync(this.key);
	if(recentGameList){
      this.recentGameList = recentGameList;
      return;
    }else{
      var recentGameList = [
        {
	        "gameId": 1,
	        "type": "xcx",
	        "appId": "wx5b6b8f9a7aad9945",
	        "name": "无限楼",
	        "desc": "攀登无限楼，收获白富美",
	        "logo": "https://snsgame.uimg.cn/video/game/wxl/logo.jpg",
	        "poster": "https://snsgame.uimg.cn/video/game/wxl/wxl.jpg",
	        "vsrc": "",
	        "vshow": false,
	        "mode": "scaleToFill",
	        "direction": 0,
	        "bg": "https://snsgame.uimg.cn/video/game/wxl/WechatIMG29.jpeg",
	        "path": "",
	        "extra": "",
	        "pics": [
	            "https://snsgame.uimg.cn/video/game/wxl/pic1.jpg",
	            "https://snsgame.uimg.cn/video/game/wxl/pic2.jpg",
	            "https://snsgame.uimg.cn/video/game/wxl/pic3.jpg"
	        ],
	        "playerNum": 90018,
	        "tags": [
	            "休闲",
	            "益智"
	        ],
	        "linkMode": 1,
	        "icon": "https://snsgame.uimg.cn/video/game/wxl/logo.jpg"
	    },
	    {
	        "gameId": 2,
	        "type": "xcx",
	        "appId": "wx79e9ff8d3b29b3d4",
	        "name": "动感羽毛球",
	        "desc": "全民休闲竞技羽毛球游戏",
	        "logo": "https://snsgame.uimg.cn/video/game/dgymq/dgymq.png",
	        "poster": "https://snsgame.uimg.cn/video/game/dgymq/ymq.jpg",
	        "mode": "scaleToFill",
	        "vsrc": "",
	        "vshow": false,
	        "direction": 1,
	        "bg": "https://snsgame.uimg.cn/video/game/dgymq/ymqbg.jpg",
	        "path": "",
	        "extra": "",
	        "pics": [
	            "https://snsgame.uimg.cn/video/game/dgymq/pic1.jpg",
	            "https://snsgame.uimg.cn/video/game/dgymq/pic2.jpg",
	            "https://snsgame.uimg.cn/video/game/dgymq/pic3.jpg"
	        ],
	        "playerNum": 80425,
	        "tags": [
	            "休闲",
	            "益智"
	        ],
	        "linkMode": 2,
	        "icon": "https://snsgame.uimg.cn/video/game/dgymq/dgymq.png"
	    },
      ];
      wx.setStorageSync(this.key, recentGameList);
      this.recentGameList = recentGameList;
    }
};

SaveRecentGame.prototype.save = function(gameInfo){
	var recentGameList = this.recentGameList;
	if(recentGameList.length >= this.maxStorage){
		recentGameList.splice(-1, 1);
	}
	recentGameList.unshift(gameInfo);
	this.recentGameList = recentGameList;
	wx.setStorageSync(this.key, recentGameList);
};
SaveRecentGame.prototype.get = function(itemSize){
	itemSize = itemSize || this.maxStorage;
	return this.recentGameList.slice(0, itemSize);
};

module.exports = SaveRecentGame;