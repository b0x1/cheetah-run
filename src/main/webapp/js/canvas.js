
Canvas = function(canvasElement, bgImage, cheetah) {
  this.background = bgImage;
  this.elem = document.getElementById(canvasElement);

  this.ctx = this.elem.getContext("2d");
  this.cheetah = cheetah;

  this.balloonIndex = 4;
  this.resize();

  var self = this;
  window.focus();
  self.animate = setInterval(self.draw.bind(self), 50);
  cheetah.animate = setInterval(cheetah.run.bind(cheetah), 80);
}

Canvas.prototype = {
  constructor: Canvas,
  resize: function() {
    this.width = PARAMETERS.canvas.width;
    this.height = PARAMETERS.canvas.height;
    this.elem.width = this.width;
    this.elem.height = this.height;
  },

  textBubble: function(text) {
    this.ctx.font = "30pt Arial";
    this.ctx.fillStyle = "#f7f7f4";
//    if (cheetah.lastkey)
//      this.ctx.fillText(cheetah.lastkey, this.cheetah.posX + 30, this.cheetah.posY - 30);
    this.ctx.fillText(text, this.cheetah.posX + 30, this.cheetah.posY - 30);
  },

  draw: function() {
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas

    if (this.cheetah.distance < PARAMETERS.constant_run) {
      this.ctx.drawImage(this.background, 0, 0);
    } else if (this.cheetah.distance + this.width < this.background.width) {
      this.ctx.drawImage(this.background, this.cheetah.distance - PARAMETERS.constant_run, 0, this.width, this.height, 0, 0, this.width, this.height);
    } else {
      this.ctx.drawImage(this.background, this.background.width - this.width - PARAMETERS.constant_run, 0, this.width, this.height, 0, 0, this.width, this.height)
    }

    this.textBubble(cheetah.posX + " " + cheetah.distance);
    this.ctx.drawImage(this.cheetah.image, this.cheetah.posX, this.cheetah.posY, this.cheetah.width, this.cheetah.height);
  }
}


RotatingCanvas = function(canvasElement, bgImage, cheetah, balloons) {
  Canvas.call(this, canvasElement, bgImage, cheetah);
  this.balloons = balloons;
  this.imageX = 0;
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

    // DEBUG BUBBLE
//    this.textBubble(this.imageX + " : " + this.width + " : " + this.background.width);

}
