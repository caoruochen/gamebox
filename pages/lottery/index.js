var QKPage = require("../../libs/page");
var http = require("../../util/http");
var rotateAward = require("../../util/rotateAward");

var app = getApp();
var sysInfo = app.globalData.sysInfo;
var userInfo = app.globalData.userInfo;

QKPage({
  data: {
    rotateAngle: 'transform: rotate(0);',
    turnImg: "",
    expend: 0,
    leftCoin: 0,
    lotteryUrl: 'https://game.7k.cn/lottery'
  },
  onLoad: function(options){
    // var lotteryUrl = this.data.lotteryUrl;
    // var uid = userInfo ? userInfo.uid : -1;
    // var token = userInfo ? userInfo.token : '';
    // lotteryUrl = lotteryUrl + '?uid=' + uid + '&token=' + token;
    // this.setData({lotteryUrl: lotteryUrl});
    var me = this;
    http.get('/gamebox/user/prize', function (data){
      me.setData({
        turnImg: data.pic,
        expend: data.expend,
        leftCoin: data.coins
      });
      app.$updateUser({
        coins: data.coins
      });
    });
    this.isRotating = false;
    this.lottery = new rotateAward({page: this});
  },
  doAward: function(e){
    if(this.isRotating){
      return;
    }
    this.isRotating = true;
    var me = this;
    var expend = this.data.expend - 0;
    var leftCoin = this.data.leftCoin - 0;
    if(leftCoin < expend){
      wx.showToast({
        title: '金币不足',
        icon: 'none',
      });
    }else{
      http.post('/gamebox/user/drawprize', function (data){
        var lastAng = data.angle;
        // var lastAng = Math.floor(Math.random() * 6) * 60
        console.log(lastAng)
        me.setData({
          leftCoin: data.coins
        });
        app.$updateUser({
          coins: data.coins
        });
        me.lottery.rotate(lastAng, function(){
          console.log(data.prize);
          me.isRotating = false;
        });
      });
    }
  }

});
