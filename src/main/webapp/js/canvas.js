
Canvas = function(canvasElement, bgImage, cheetah) {
  this.elem = document.getElementById(canvasElement);

  this.ctx = this.elem.getContext("2d");
  this.cheetah = cheetah;

  var style = this.elem.style;
  this.bgImage = bgImage;
  style.margin = "auto";
  style.display = "block";
  style.width = "100%";
  style.backgroundImage = "url('" + bgImage.src + "')";
  style.backgroundRepeat = "repeat-x";
  style.backgroundSize = "auto 100%";

  this.imageX = 0;
  this.stepSize = 40;

  this.resize();
}

Canvas.prototype = {
  constructor: Canvas,
  resize: function() {
    this.width = PARAMETERS.canvas.width;
    this.height = PARAMETERS.canvas.height;
    this.elem.width = this.width;
    this.elem.height = this.height;
  },

  draw: function() {
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas
  }
}

AugmentedCanvas = function(canvasElement, bgImage, cheetah) {
  Canvas.call(this, canvasElement, bgImage, cheetah);
  this.textBubbles = [];
}

AugmentedCanvas.prototype = Object.create(Canvas.prototype);
AugmentedCanvas.prototype.constructor = AugmentedCanvas;
AugmentedCanvas.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas
  
  if (this.cheetah.posX < PARAMETERS.constant_run) {
    this.elem.style.backgroundPosition = "0 0";
  } else if (cheetah.steps <= PARAMETERS.maximum_steps - (PARAMETERS.canvas.width - PARAMETERS.constant_run - cheetah.width) / cheetah.stepSize) {
    this.imageX -= this.stepSize;
    this.elem.style.backgroundPosition = this.imageX + 'px 0';
  }

  var tempBubbles = [];
  for (var i = 0; i < this.textBubbles.length; i++) {
    this.textBubbles[i].bubble();
    if (this.textBubbles[i].opacity > 0) {
      tempBubbles.push(this.textBubbles[i]);
    }
  }
  this.textBubbles = tempBubbles;

  this.ctx.drawImage(this.cheetah.image, this.cheetah.posX, this.cheetah.posY, this.cheetah.width, this.cheetah.height);    
}

RotatingCanvas = function(canvasElement, bgImage, cheetah, balloons) {
  Canvas.call(this, canvasElement, bgImage, cheetah);
  this.balloons = balloons;
  this.balloonIndex = 0;
  this.stepSize = 10;
}

RotatingCanvas.prototype = Object.create(Canvas.prototype);
RotatingCanvas.prototype.constructor = RotatingCanvas;
RotatingCanvas.prototype.draw = function() {
    var balloon1 = this.balloons[this.balloonIndex];
    var balloon2 = this.balloonIndex < this.balloons.length - 1 ? this.balloons[this.balloonIndex + 1] : this.balloons[0];

    this.imageX -= this.stepSize;
    this.elem.style.backgroundPosition = this.imageX + 'px 0';

    this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas

    if (balloon1.animate === undefined) {
      balloon1.animate = setInterval(balloon1.fly.bind(balloon1), 25);
    }
    if (balloon1.posX < this.width / 2) {
      if (balloon2.animate === undefined) {
        balloon2.animate = setInterval(balloon2.fly.bind(balloon2), 25);
      }
      this.ctx.drawImage(balloon2.image, balloon2.posX, balloon2.posY, balloon2.width, balloon2.height);
    }

    if (-balloon1.posX < balloon1.width) {
      this.ctx.drawImage(balloon1.image, balloon1.posX, balloon1.posY, balloon1.width, balloon1.height);
    } else {
      clearInterval(balloon1.animate);
      delete balloon1.animate;
      balloon1.posX = this.width;
      this.balloonIndex += 1;
      this.balloonIndex %= this.balloons.length;
    }

    // draw Cheetah
    this.ctx.drawImage(this.cheetah.image, this.cheetah.posX, this.cheetah.posY, this.cheetah.width, this.cheetah.height);
}
