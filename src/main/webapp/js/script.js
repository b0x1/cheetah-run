Cheetah = function(imageSources) {
  this.image = new Image();
  this.imagePos = 0;
  this.image.src = imageSources[this.imagePos];
  this.imageSources = imageSources;
  this.stepSize = 100;
  this.height = 250;  // Cheetah size
  this.width = this.image.width / this.image.height * this.height
  this.posX = 0;
  this.posY = 960 - this.height - 120;
  this.distance = this.posX;
  this.lastkey;

  window.onkeypress = this.run.bind(this);
}

Cheetah.prototype = {
  run : function(evt) {
    // Move Cheetah on screen
    if (this.posX + this.stepSize <= CONSTANT_RUN || this.distance >= FINAL_SPURT) {
      this.posX += this.stepSize;
    }

    // Distance Cheetah has run.
    this.distance += this.stepSize;
    this.lastkey = evt.key;

    // Rotate images
    if (this.imagePos < this.imageSources.length - 1) {
      this.imagePos += 1;
    } else {
      this.imagePos = 0;
    }
    this.image.src = this.imageSources[this.imagePos];

    // End the game
    if (this.posX + this.width > CANVAS_WIDTH) {
      stopGame();
    }
  }
}

Canvas = function(canvasElement, bgImage, cheetah) {
  this.background = new Image();
  this.background.src = bgImage;
  this.elem = document.getElementById(canvasElement);
  this.ctx = this.elem.getContext("2d");
  this.width = this.elem.width;
  this.height = this.elem.height;
  this.cheetah = cheetah;

  window.focus();
}

Canvas.prototype = {
  bubble: function(text) {
    this.ctx.font = "30pt Arial";
    this.ctx.fillStyle = "#f7f7f4";
//    if (cheetah.lastkey)
//      this.ctx.fillText(cheetah.lastkey, this.cheetah.posX + 30, this.cheetah.posY - 30);
    this.ctx.fillText(text, this.cheetah.posX + 30, this.cheetah.posY - 30);
  },

  draw: function() {
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas

    if (this.cheetah.distance < CONSTANT_RUN) {
      this.ctx.drawImage(this.background, 0, 0);
    } else if (this.cheetah.distance + this.width < this.background.width) {
      this.ctx.drawImage(this.background, this.cheetah.distance - CONSTANT_RUN, 0, this.width, this.height, 0, 0, this.width, this.height);
    } else {
      this.ctx.drawImage(this.background, this.background.width - this.width - CONSTANT_RUN, 0, this.width, this.height, 0, 0, this.width, this.height)
    }

    this.bubble(cheetah.posX + " " + cheetah.distance);
    this.ctx.drawImage(this.cheetah.image, this.cheetah.posX, this.cheetah.posY, this.cheetah.width, this.cheetah.height);
  }
}

RunningCheetah = function(imageSources) {
  Cheetah.call(this, imageSources);
  this.posX = 400;
}

RunningCheetah.prototype = Object.create(Cheetah.prototype);
RunningCheetah.prototype.run = function() {
  // Rotate images
  if (this.imagePos < this.imageSources.length - 1) {
    this.imagePos += 1;
  } else {
    this.imagePos = 0;
  }
  this.image.src = this.imageSources[this.imagePos];
}


RotatingCanvas = function(canvasElement, bgImage, cheetah) {
  Canvas.call(this, canvasElement, bgImage, cheetah);
  this.imageX = 0;
  this.stepSize = 10;
}

RotatingCanvas.prototype = Object.create(Canvas.prototype);
RotatingCanvas.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas


    var rightMargin = this.width - (this.background.width - this.imageX);

    this.ctx.drawImage(this.background,
                       this.imageX, 0, this.width, this.height, // image coordinates
                       0, 0, this.width, this.height);  // canvas coordinates

    if (rightMargin > 0) {
      this.ctx.drawImage(this.background,
              0, 0, rightMargin, this.height, // image coordinates
              this.width - rightMargin, 0, rightMargin, this.height);
    }

    this.imageX = this.imageX < this.background.width ? this.imageX + this.stepSize : 0;


    this.ctx.drawImage(this.cheetah.image, this.cheetah.posX, this.cheetah.posY, this.cheetah.width, this.cheetah.height);
    this.bubble(this.imageX + " " + rightMargin);
}


cheetah = new RunningCheetah(["images/cheetah_run01.png", "images/cheetah_run02.png",
                       "images/cheetah_run03.png", "images/cheetah_run02.png"]);
canvas = new RotatingCanvas("cheetah-track", "images/steppe_v2.png", cheetah);

var startGame = function(cheetahSpeed, canvasSpeed) {
  cheetah.animate = setInterval(cheetah.run.bind(cheetah), cheetahSpeed);
  canvas.animate = setInterval(canvas.draw.bind(canvas), canvasSpeed);
}

var stopGame = function() {
  window.onkeypress = null;
  clearInterval(canvas.animate);
  clearInterval(cheetah.animate); // Compatibility issue with Cheetah
}

startGame(333, 50);

var CONSTANT_RUN = 400;
var FINAL_SPURT = canvas.background.width - canvas.width;
var CANVAS_WIDTH = canvas.width;
var TOTAL_DISTANCE = canvas.background.width;

