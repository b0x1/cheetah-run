Balloon = function(image, baseLine, amplitude, startX) {
  this.image = image;
  this.stepSize = 12;
  this.baseLine = baseLine;
  this.amplitude = amplitude;
  this.height = 300;
  this.width = this.image.width / this.image.height * this.height
  this.posX = startX;
  this.posY = this.fly();
}

Balloon.prototype = {
  fly : function() {
    var y = this.amplitude * Math.sin(this.posX * 0.01) + this.baseLine;
    this.posY = y;
    this.posX -= this.stepSize;
    return y;
  }
}
