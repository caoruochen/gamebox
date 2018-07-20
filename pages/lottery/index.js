var QKPage = require("../../libs/page");
var http = require("../../util/http");
var rotateAward = require("../../util/rotateAward");

var app = getApp();
var sysInfo = app.globalData.sysInfo;

QKPage({
  data: {
    rotateAngle: 'transform: rotate(0)',
    turnImg: "",
    expend: 0,
    leftCoin: 0
  },
  onLoad: function(){
    var me = this;
    http.get('/gamebox/user/prize', function (data){
      me.setData({
        turnImg: data.pic,
        expend: data.expend,
        leftCoin: data.coins
      });
    });
    this.lottery = new rotateAward({page: this});
  },
  doAward: function(e){
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
        console.log(lastAng)
        me.setData({
          leftCoin: data.coins
        });
        me.lottery.rotate(lastAng, function(){
          console.log(data.prize);
        });
      });
    }
  }

});
