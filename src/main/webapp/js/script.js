Cheetah = function(name, imageSources) {
  this.name = name;
  this.image = new Image();
  this.imagePos = 0;
  this.image.src = imageSources[this.imagePos];
  this.stepSize = 100;
  this.height = 250;  // Cheetah size
  this.width = this.image.width / this.image.height * this.height
  this.posX = 0;
  this.posY = 960 - this.height - 120;
  this.distance = this.posX;
  this.lastkey;

  this.run = function(evt) {
    // Move Cheetah on screen
    if (this.posX + this.stepSize <= CONSTANT_RUN || this.distance >= FINAL_SPURT) {
      this.posX += this.stepSize;
    }

    // Distance Cheetah has run.
    this.distance += this.stepSize;
    this.lastkey = evt.key;

    // Rotate images
    if (this.imagePos < imageSources.length - 1) {
      this.imagePos += 1;
    } else {
      this.imagePos = 0;
    }
    this.image.src = imageSources[this.imagePos];

    // End the game
    if (this.posX + this.width > CANVAS_WIDTH) {
      stopGame();
    }
  }

  window.onkeypress = this.run.bind(this);
}

Canvas = function(canvasElement, bgImage, cheetah) {
  this.background = new Image();
  this.background.src = bgImage;
  this.elem = document.getElementById(canvasElement);
  this.ctx = this.elem.getContext("2d");
  this.width = this.elem.width;
  this.height = this.elem.height;
  this.cheetah = cheetah;

  this.bubble = function() {
    this.ctx.font = "30pt Arial";
    this.ctx.fillStyle = "#f7f7f4";
//    if (cheetah.lastkey)
//      this.ctx.fillText(cheetah.lastkey, this.cheetah.posX + 30, this.cheetah.posY - 30);
    this.ctx.fillText(cheetah.posX + " " + cheetah.distance, this.cheetah.posX + 30, this.cheetah.posY - 30);
  }

  this.draw = function() {
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas

    if (this.cheetah.distance < CONSTANT_RUN) {
      this.ctx.drawImage(this.background, 0, 0);
    } else if (this.cheetah.distance + this.width < this.background.width) {
      this.ctx.drawImage(this.background, this.cheetah.distance - CONSTANT_RUN, 0, this.width, this.height, 0, 0, this.width, this.height);
    } else {
      this.ctx.drawImage(this.background, this.background.width - this.width - CONSTANT_RUN, 0, this.width, this.height, 0, 0, this.width, this.height)
    }

    this.bubble();
    this.ctx.drawImage(this.cheetah.image, this.cheetah.posX, this.cheetah.posY, this.cheetah.width, this.cheetah.height);
  }

  window.focus();
  this.animate = setInterval(this.draw.bind(this), 30);
}

var stopGame = function() {
  window.onkeypress = null;
  clearInterval(canvas.animate);
}


cheetah = new Cheetah("Gepardec", ["images/cheetah_run01.png", "images/cheetah_run02.png"]);
canvas = new Canvas("cheetah-track", "images/steppe.png", cheetah);

var CONSTANT_RUN = 400;
var FINAL_SPURT = canvas.background.width - canvas.width;
var CANVAS_WIDTH = canvas.width;
var TOTAL_DISTANCE = canvas.background.width;
