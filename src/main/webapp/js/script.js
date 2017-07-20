Cheetah = function(name, imageSource) {
  this.name = name;
  this.image = new Image();
  this.image.src = imageSource;
  this.stepSize = 10;
  this.posX = 10;
  this.posY = 155;

  this.run = function(evt) {
    if (this.posX + this.stepSize < canvas.width) {
      this.posX += this.stepSize;
      canvas.lastkey = evt.key;
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
    if (this.lastkey)
      this.ctx.fillText(this.lastkey, this.cheetah.posX + 30, this.cheetah.posY - 30);
  }

  this.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  this.draw = function() {
    this.clear();
    this.ctx.drawImage(this.background, 0, 0);
    this.bubble();
    this.ctx.drawImage(this.cheetah.image, this.cheetah.posX, this.cheetah.posY);
  }

  window.focus();
  setInterval(this.draw.bind(this), 30);
}


cheetah = new Cheetah("Gepardec", "images/cheetah.png");
canvas = new Canvas("cheetah-track", "images/background.jpeg", cheetah);
