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
          gameId: 1,
          title: '无限楼',
          desc: '职场能手',
          playerNum: '100万',
          tags: ['休闲', '益智'], // 非必填
          type: 'xcx',  // xcx, xyx, h5
          linkMode: 1, // 1点击跳转, 2打开背景图扫码, 3进入详情页, 4进入webview;  , 3表示进入当前小程序其它页面，由path指定页面路径，extra指定跳转参数；4表示进入当前小程序webview页面，path为页面url
          appId: '12345',
          path: '/pages/ad?12', // 跳转参数，非必填
          extra: 'a=1&b=2', // 跳转补充参数，非必填
          icon: 'https://***',
          bg: 'https://***', // linkMode=2时，必填
        },
        {
          gameId: 2,
          title: '无限楼',
          desc: '职场能手',
          playerNum: '100万',
          tags: ['休闲', '益智'], // 非必填
          type: 'xcx',  // xcx, xyx, h5
          linkMode: 1, // 1点击跳转, 2打开背景图扫码, 3进入详情页, 4进入webview;  , 3表示进入当前小程序其它页面，由path指定页面路径，extra指定跳转参数；4表示进入当前小程序webview页面，path为页面url
          appId: '12345',
          path: '/pages/ad?12', // 跳转参数，非必填
          extra: 'a=1&b=2', // 跳转补充参数，非必填
          icon: 'https://***',
          bg: 'https://***', // linkMode=2时，必填
        }
      ]
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