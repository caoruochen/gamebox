var app = getApp();
var sysInfo = app.globalData.sysInfo;
var swiperHeight = 150;
Page({
  data: {
    toView: 'red',
    swiperHeight: swiperHeight,
    gamesHeight: (sysInfo.windowHeight - swiperHeight)+'px',
    scrollTop: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    games: [
      {
        gid: '1',
        name: '斗兽棋',
        desc: '智商高的人都在玩...',
        logo: 'https://snsgame.uimg.cn/games/dsq/common/%E6%96%97%E5%85%BD%E6%A3%8B.png',
        appId: '123'
      },
      {
        gid: '1',
        name: '斗兽棋',
        desc: '智商高的人都在玩...',
        logo: 'https://snsgame.uimg.cn/games/dsq/common/%E6%96%97%E5%85%BD%E6%A3%8B.png',
        appId: '123'
      },
      {
        gid: '1',
        name: '斗兽棋',
        desc: '智商高的人都在玩...',
        logo: 'https://snsgame.uimg.cn/games/dsq/common/%E6%96%97%E5%85%BD%E6%A3%8B.png',
        appId: '123'
      },
      {
        gid: '1',
        name: '斗兽棋',
        desc: '智商高的人都在玩...',
        logo: 'https://snsgame.uimg.cn/games/dsq/common/%E6%96%97%E5%85%BD%E6%A3%8B.png',
        appId: '123'
      },
      {
        gid: '1',
        name: '斗兽棋',
        desc: '智商高的人都在玩...',
        logo: 'https://snsgame.uimg.cn/games/dsq/common/%E6%96%97%E5%85%BD%E6%A3%8B.png',
        appId: '123'
      },
      {
        gid: '1',
        name: '斗兽棋',
        desc: '智商高的人都在玩...',
        logo: 'https://snsgame.uimg.cn/games/dsq/common/%E6%96%97%E5%85%BD%E6%A3%8B.png',
        appId: '123'
      },
      {
        gid: '1',
        name: '斗兽棋',
        desc: '智商高的人都在玩...',
        logo: 'https://snsgame.uimg.cn/games/dsq/common/%E6%96%97%E5%85%BD%E6%A3%8B.png',
        appId: '123'
      },
      {
        gid: '1',
        name: '斗兽棋',
        desc: '智商高的人都在玩...',
        logo: 'https://snsgame.uimg.cn/games/dsq/common/%E6%96%97%E5%85%BD%E6%A3%8B.png',
        appId: '123'
      },

    ],
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
})
