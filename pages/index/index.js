Page({
  data: {
    fit: "cover",
    src: '',
    hidden: false,
    src1: 'https://snsgame.uimg.cn/video/game/1527334529691.mp4',
    autoplay: true,
    poster: "https://img.tapimg.com/market/images/ee907c5487e95b0caf0d5ecd6740c775.jpg?imageMogr2/auto-orient/thumbnail/2080x/strip/gravity/Center/crop/2080x828/format/jpg/quality/80/interlace/1"
  },
  onLoad: function () {
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  onTapNavbar: function (e) {
  },
  switchChannel: function (targetChannelIndex) {
  },
  bindButtonTap: function (e) {
    this.setData({
      src: this.data.src1
    })
  },
  changeVideo: function (e) {
    if (this.data.hidden) {
      return;
    }
    this.setData({
      src: this.data.src1,
      hidden: true
    })
  },
  waiting (e) {
    console.log('bindwaiting')
  }
});
