var RotateAward = function(options){
	options = options || {};
  this.page = options.page;
	this.initAngle = options.initAngle - 0 || 0;
	this.turn = options.turn ? Math.max(options.turn - 0, 10) : 10;
  this.progress = 15;
};

RotateAward.prototype.rotate = function(lastAng, cb){
  cb && (this.cb = cb);
  this.totalAngle = this.initAngle;
  var section = [3, 6, 8, 9.4, 9.7, 9.9];
  this.boundary = section.map(x => x * 360);
  this.lastAng = this.turn * 360 + lastAng;
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
  }else if(this.totalAngle <= this.boundary[4]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress / 2;
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle <= this.boundary[5]){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress / 3;
    setTimeout(this.step.bind(this), 16.66667);
  }else if(this.totalAngle < this.lastAng){
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.totalAngle + "deg)"
    });
    this.totalAngle = this.totalAngle + this.progress / 4;
    setTimeout(this.step.bind(this), 16.66667);
  }else{
    this.page.setData({
      rotateAngle: "transform: rotate(" + this.lastAng + "deg)"
    });
    this.totalAngle = this.lastAng;
    this.cb && this.cb();
  }
};

module.exports = RotateAward;