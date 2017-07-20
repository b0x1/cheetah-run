var CONSTANT_RUN = 400;


Cheetah = function(name, imageSource) {
  this.name = name;
  this.image = new Image();
  this.image.src = imageSource;
  this.stepSize = 10;
  this.posX = 10;
  this.posY = 800;
  this.distance = this.posX;
  this.lastkey;

  this.run = function(evt) {
    if (this.posX + this.stepSize < CONSTANT_RUN) {
      this.posX += this.stepSize;
    }
    this.distance += this.stepSize;
    this.lastkey = evt.key;
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
    if (cheetah.lastkey)
      this.ctx.fillText(cheetah.lastkey, this.cheetah.posX + 30, this.cheetah.posY - 30);
  }

  this.draw = function() {
    this.ctx.clearRect(0, 0, this.width, this.height); // Clear Canvas

    if (cheetah.distance < CONSTANT_RUN) {
      this.ctx.drawImage(this.background, 0, 0);
    } else {
      this.ctx.drawImage(this.background, cheetah.distance, 0, this.width, this.height, 0, 0, this.width, this.height);
    }

    this.bubble();
    this.ctx.drawImage(this.cheetah.image, this.cheetah.posX, this.cheetah.posY);
  }

  window.focus();
  setInterval(this.draw.bind(this), 30);
}


cheetah = new Cheetah("Gepardec", "images/cheetah.png");
canvas = new Canvas("cheetah-track", "images/steppe.png", cheetah);
