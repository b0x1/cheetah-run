TextBubble = function(ctx, text, posX, posY, isPermanent) {
  this.ctx = ctx;
  this.ctx.font = "30pt Arial";
  this.ctx.fillStyle = "black";
  this.posX = posX || 0;
  this.posY = posY || 0;
  this.text = text || "";
  this.isPermanent = isPermanent || false;
  this.opacity = 1;
}

TextBubble.prototype = {
  constructor: TextBubble,
  
  bubble: function() {
    this.ctx.fillStyle = "rgba(0, 0, 0, " + this.opacity + ")";
    this.ctx.textAlign="center";
    this.ctx.fillText(this.text, this.posX, this.posY);

    this.opacity -= 0.1;
    this.posY -= 40;
  }
};

Picture = function(image, dayX, posY, sizeRatio) {
  this.image = image;
  this.sizeRatio = sizeRatio || 0.5;
  this.dayX = dayX || 0;
  this.posY = posY || 40;
  this.resize();
};

Picture.prototype = {
  constructor: Picture,

  resize: function() {
    if (PARAMETERS.canvas.height < PARAMETERS.canvas.width) {
      this.height = PARAMETERS.canvas.height * this.sizeRatio;
      this.width = this.image.width / this.image.height * this.height;
    } else {
      this.width = PARAMETERS.canvas.width * this.sizeRatio;
      this.height = this.image.height / this.image.width * this.width;
    }
  }
};


Balloon = function(image, baseLine, amplitude) {
  this.image = image;
  this.resize();
  this.canvasWidth = PARAMETERS.canvas.width;
  this.posY = this.fly();
};

Balloon.prototype = {
  constructor: Balloon,
  resize: function() {
    this.posX = this.posX * PARAMETERS.canvas.width / this.canvasWidth;
    this.canvasWidth = PARAMETERS.canvas.width;

    if (PARAMETERS.canvas.height < PARAMETERS.canvas.width) {
      this.height = PARAMETERS.canvas.height * 0.4;
      this.width = this.image.width / this.image.height * this.height;
    } else {
      this.width = PARAMETERS.canvas.width * 0.4;
      this.height = this.image.height / this.image.width * this.width;
    }

    this.baseLine = PARAMETERS.canvas.height / 3 - this.height / 2;
    this.amplitude = this.baseLine;

    this.stepSize = PARAMETERS.canvas.width / 600;
  },

  fly : function() {
    var y = this.amplitude * Math.sin(this.posX * (0.02 / this.stepSize)) + this.baseLine;
    this.posY = y;
    this.posX -= this.stepSize;
    return y;
  }
};