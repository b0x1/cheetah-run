Balloon = function(image, baseLine, amplitude) {
  this.image = image;
  this.stepSize = 12;
  this.baseLine = baseLine;
  this.amplitude = amplitude;

  this.resize();

  this.posY = this.fly();
}

Balloon.prototype = {
  resize: function() {
    if (PARAMETERS.canvas.height < PARAMETERS.canvas.width) {
      this.height = PARAMETERS.canvas.height * 0.3;;
      this.width = this.image.width / this.image.height * this.height;
    } else {
      this.width = PARAMETERS.canvas.width * 0.25;
      this.height = this.image.height / this.image.width * this.width;
    }
    this.posX = PARAMETERS.canvas.width;
  },

  fly : function() {
    var y = this.amplitude * Math.sin(this.posX * 0.01) + this.baseLine;
    this.posY = y;
    this.posX -= this.stepSize;
    return y;
  }
}
