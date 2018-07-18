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
    this.lottery = new rotateAward({page: this, copies: 6});
    // setTimeout(function(){
    //   console.log("time")
    // }, 1000);
    // function step(timestamp) {
    //   console.log(timestamp)
    // }

    // requestAnimationFrame(step);
  },
  doAward: function(e){
    this.lottery.rotate(function(item){
      switch(item){
        case 0: 
          console.log("iPhone");
          break;
        case 1:
          console.log("再来一次");
          break;
        case 2:
          console.log("20元 无门槛券");
          break;
        case 3:
          console.log("10元 无门槛券");
          break;
        case 4:
          console.log("再来一次");
          break;
        case 5:
          console.log("50元 无门槛券");
          break;
        default:
          console.log("幸运奖");
      }
    });
  }

});
