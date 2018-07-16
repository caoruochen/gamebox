var RotateAward = function(options){
	options = options || {};
  this.page = options.page;
  this.duration = options.duration - 0 || 5000;
	this.initAngle = options.initAngle - 0 || 0;
	this.copies = options.copies - 0 || 7;
	this.turn = options.turn ? Math.max(options.turn - 0, 10) : 10;
	this.isRotating = false;
  this.section = 4;
  this.progress = 15;
};

RotateAward.prototype.rotate = function(cb){
  if(this.isRotating){
    return;
  }
  cb && (this.cb = cb);
  this.isRotating = true;
  this.totalAngle = this.initAngle;
  this.rand = rnd(this.copies);
  var ratio = this.rand/this.copies;
  var totalTurn = this.turn + ratio;
  this.lastAng = totalTurn * 360;
  console.log(this.rand)
  var animation = wx.createAnimation({
    timingFunction: 'ease'
  });
  this.animation = animation;
  this.animation.rotate(this.totalAngle).step({duration: 0});
  this.page.setData({
    animationData: this.animation.export()
  });
  setTimeout(this.step.bind(this), 16.66667);
};

RotateAward.prototype.step = function(){
  var section = [3, 5, 7, 9.5];
  var boundary = section.map(x => x * 360);
  
  if(this.totalAngle <= boundary[0]){
    this.totalAngle = this.totalAngle + this.progress * 5;
    this.animation.rotate(this.totalAngle).step();
    this.page.setData({
      animationData: this.animation.export()
    });
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle <= boundary[1]){
    this.totalAngle = this.totalAngle + this.progress * 3;
    this.animation.rotate(this.totalAngle).step();
    this.page.setData({
      animationData: this.animation.export()
    });
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle <= boundary[2]){
    this.totalAngle = this.totalAngle + this.progress * 2;
    this.animation.rotate(this.totalAngle).step();
    this.page.setData({
      animationData: this.animation.export()
    });
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle <= boundary[3]){
    this.totalAngle = this.totalAngle + this.progress;
    this.animation.rotate(this.totalAngle).step();
    this.page.setData({
      animationData: this.animation.export()
    });
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle < this.lastAng){
    this.totalAngle = this.totalAngle + this.progress / 2;
    this.animation.rotate(this.totalAngle).step();
    this.page.setData({
      animationData: this.animation.export()
    });
    setTimeout(this.step.bind(this), 16.66667);
  }else{
    this.animation.rotate(this.totalAngle).step();
    this.page.setData({
      animationData: this.animation.export()
    });
    this.totalAngle = this.lastAng;
    this.isRotating = false;
    this.cb && this.cb(this.rand);
  }
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