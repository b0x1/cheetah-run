
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
  this.stepSize = PARAMETERS.stepSize;

  this.resize();
};

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
};

AugmentedCanvas = function(canvasElement, bgImage, cheetah, pictures) {
  Canvas.call(this, canvasElement, bgImage, cheetah);
  this.pictures = pictures;
  this.textBubbles = [];
};

AugmentedCanvas.prototype = Object.create(Canvas.prototype);
AugmentedCanvas.prototype.constructor = AugmentedCanvas;
AugmentedCanvas.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas
  
  if (this.cheetah.posX < PARAMETERS.constantRun) {
    this.elem.style.backgroundPosition = "0 0";
  } else if (cheetah.steps <= PARAMETERS.maximumSteps - (PARAMETERS.canvas.width - PARAMETERS.constantRun - cheetah.width) / cheetah.stepSize) {
    this.imageX += this.stepSize;
    this.elem.style.backgroundPosition = (-this.imageX) + 'px 0';
  }

  for (var i = 0; i < this.pictures.length; i++) {
    var p = this.pictures[i];
    if (p.dayX * this.stepSize + cheetah.width  < this.imageX + this.width) {
      this.ctx.drawImage(p.image, p.dayX * this.stepSize + cheetah.width - p.width - this.imageX, p.posY, p.width, p.height);
    }
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
};

AugmentedCanvas.prototype.showWinScreen = function(playerName) {
  this.ctx.lineWidth = 0;
  this.ctx.strokeStyle = "white";
  this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  roundRect(this.ctx, this.width / 4, this.height / 3, this.width/2 , this.height/3, 10, true, true);
  this.ctx.textAlign="center";
  this.ctx.textBaseline = "middle";
  this.ctx.fillStyle = "#000000";
  this.ctx.fillText(playerName + " håt a neichs iPad!", this.width / 2,this.height / 2);
};


RotatingCanvas = function(canvasElement, bgImage, cheetah, balloons) {
  Canvas.call(this, canvasElement, bgImage, cheetah);
  this.balloons = balloons;
  this.balloonIndex = 0;
  this.stepSize = 10;
};

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
};


/**
 * From: http://jsfiddle.net/vu7dZ/1/
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  stroke = stroke || true;
  radius = radius || 5;
  fill = fill || true;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fill();
  }
}