var RotateAward = function(options){
	options = options || {};
  this.page = options.page;
	this.initAngle = options.initAngle - 0 || 0;
	this.copies = options.copies - 0 || 7;
	this.turn = options.turn ? Math.max(options.turn - 0, 10) : 10;
	this.isRotating = false;
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
  console.log(this.rand);
  requestAnimationFrame(this.step.bind(this));
};

RotateAward.prototype.step = function(timestamp){
  var section = [3, 5, 7, 9.5];
  var boundary = section.map(x => x * 360);
  var ratio = this.rand/this.copies;
  var totalTurn = this.turn + ratio;
  var lastAng = totalTurn * 360;
  if(this.totalAngle <= boundary[0]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress * 5;
    requestAnimationFrame(this.step.bind(this));
  }else if(this.totalAngle <= boundary[1]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress * 3;
    requestAnimationFrame(this.step.bind(this));
  }else if(this.totalAngle <= boundary[2]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress * 2;
    requestAnimationFrame(this.step.bind(this));
  }else if(this.totalAngle <= boundary[3]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress;
    requestAnimationFrame(this.step.bind(this));
  }else if(this.totalAngle < lastAng){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress / 2;
    requestAnimationFrame(this.step.bind(this));
  }else{
    this.page.setData({
      rotateAngle: "transform: rotate(" + lastAng + "deg)"
    });
    this.totalAngle = lastAng;
    this.isRotating = false;
    this.cb && this.cb(this.rand);
  }
};

var rnd = function(n){
  return Math.floor(Math.random() * n);
};
module.exports = RotateAward;