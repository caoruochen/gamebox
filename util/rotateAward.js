var RotateAward = function(options){
	options = options || {};
  this.page = options.page;
  this.duration = options.duration - 0 || 5000;
	this.initAngle = options.initAngle - 0 || 0;
	this.copies = options.copies - 0 || 7;
	this.turn = options.turn ? Math.max(options.turn - 0, 8) : 8;
	this.isRotating = false;
  this.section = 4;
};

RotateAward.prototype.rotate = function(cb){
  if(this.isRotating){
    return;
  }
  this.isRotating = true;
  var rand = rnd(this.copies);
  var ratio = rand/this.copies;
  var totalTurn = this.turn + ratio;
  var lastAng = totalTurn * 360;
  console.log(rand)
  var turnDuration = this.duration/totalTurn;
  console.log(turnDuration)
  var animation = wx.createAnimation({
    duration: turnDuration,
    timingFunction: 'ease'
  });
	this.animation = animation;
  for(var i=0; i<this.turn; i++){
    console.log("turn")
    animation.rotate(360 * i).step();
    this.page.setData({
      animationData: animation.export()
    });
  }
  // animation.rotate(lastAng).step({duration: turnDuration});
  this.page.setData({
    animationData: animation.export()
  });
  this.isRotating = false;
  setTimeout(function(){
    cb && cb(rand);
  }, 10);
};

RotateAward.prototype.splitSection = function(section){
  var secArr = [];
  var max = this.turn - 1;
  if(max < section){
    secArr = [2, 4, 2];
  }else{
    var a = Math.floor(max/section);
    var b = max % section;
    secArr[0] = 1;
  }
};

var rnd = function(n){
  return Math.floor(Math.random() * n);
};
module.exports = RotateAward;