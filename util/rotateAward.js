var RotateAward = function(options){
	options = options || {};
  this.page = options.page;
	this.initAngle = options.initAngle - 0 || 0;
	this.turn = options.turn ? Math.max(options.turn - 0, 10) : 10;
	this.isRotating = false;
  this.progress = 15;
};

RotateAward.prototype.rotate = function(lastAng, cb){
  if(this.isRotating){
    return;
  }
  cb && (this.cb = cb);
  this.isRotating = true;
  this.totalAngle = this.initAngle;
  var section = [3, 5, 7, 9.5];
  this.boundary = section.map(x => x * 360);
  this.lastAng = lastAng;
  this.step();
};

RotateAward.prototype.step = function(){
  if(this.totalAngle <= this.boundary[0]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress * 5;
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle <= this.boundary[1]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress * 3;
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle <= this.boundary[2]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress * 2;
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle <= this.boundary[3]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress;
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle < this.lastAng){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress / 2;
    setTimeout(this.step.bind(this), 16.66667);
  }else{
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.lastAng + "deg)"
    });
    this.totalAngle = this.lastAng;
    this.isRotating = false;
    this.cb && this.cb();
  }
};

module.exports = RotateAward;