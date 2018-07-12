var QKPage = require("../../libs/page");
var rotateAward = require("../../util/rotateAward");

var app = getApp();
var sysInfo = app.globalData.sysInfo;

QKPage({
  data: {
    rotateAngle: 'transform: rotate(0)',
    animationData: {}
  },
  onLoad: function () {
    this.lottery = new rotateAward({page: this});
    // setTimeout(function(){
    //   console.log("time")
    // }, 1000);
    // function step(timestamp) {
    //   console.log(timestamp)
    // }

    // requestAnimationFrame(step);
  },
  rotateAward: function(e){
    this.lottery.rotate(function(item){
      switch(item){
        case 0: 
          console.log("未中奖");
          break;
        case 1:
          console.log("1等奖");
          break;
        default:
          console.log("幸运奖");
      }
    });
  }

});
