
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

  var textOffset = 0;
  this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas

  if (this.cheetah.posX < PARAMETERS.constantRun) {
    this.elem.style.backgroundPosition = "0 0";
  } else if (cheetah.steps <= PARAMETERS.maximumSteps - (PARAMETERS.canvas.width - PARAMETERS.constantRun - cheetah.width) / cheetah.stepSize) {
    this.imageX += this.stepSize;
    textOffset = this.stepSize;
    this.elem.style.backgroundPosition = (-this.imageX) + 'px 0';
  }

  for (var i = 0; i < this.pictures.length; i++) {
    var p = this.pictures[i];
    if (p.dayX * this.stepSize  < this.imageX + this.width) {
      this.ctx.drawImage(p.image,
        p.dayX * this.stepSize + cheetah.width - p.width - this.imageX, this.height * (1 - p.posY) - p.height,
        p.width, p.height);
    }
  }

  var tempBubbles = [];
  for (var i = 0; i < this.textBubbles.length; i++) {
    this.textBubbles[i].bubble(textOffset);
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
  this.ctx.fillText(playerName, this.width / 2, this.height / 2 - 35);
  this.ctx.fillText("hat ein neues iPad!", this.width / 2,this.height / 2 + 35);

};


RotatingCanvas = function(canvasElement, bgImage, cheetah) {
  Canvas.call(this, canvasElement, bgImage, cheetah);
  this.stepSize = 10;
};

RotatingCanvas.prototype = Object.create(Canvas.prototype);
RotatingCanvas.prototype.constructor = RotatingCanvas;
RotatingCanvas.prototype.draw = function() {

    this.imageX -= this.stepSize;
    this.elem.style.backgroundPosition = this.imageX + 'px 0';

    this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas

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