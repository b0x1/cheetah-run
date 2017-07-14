
var cheetah = {
  name: "Gepardec",
  image: new Image(),
  stepSize: 10,
  posX: 10,
  posY: 155,
  init: function() {
    this.image.src = "images/cheetah.png";
    window.onkeypress = this.run.bind(this);
  },
  run: function(evt) {
    if (this.posX + this.stepSize < canvas.width) {
      this.posX += this.stepSize; 
      canvas.lastkey = evt.key;
    }
  }
};

var canvas = {
  background: new Image(),
  init: function() {
    window.focus();
    this.background.src = "images/background.jpeg";
    this.elem = document.getElementById("cheetah-track");
    this.ctx = this.elem.getContext("2d");
    this.width = this.elem.width;
    this.height = this.elem.height;

    return setInterval(this.draw.bind(this), 30);
  },
  bubble: function() {
    this.ctx.font = "30pt Arial";
    this.ctx.fillStyle = "#f7f7f4";
    if (this.lastkey)
      this.ctx.fillText(this.lastkey, cheetah.posX + 30, cheetah.posY - 30);  
  },
  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  draw: function() {
    this.clear();
    this.ctx.drawImage(canvas.background, 0, 0);
    this.bubble();
    this.ctx.drawImage(cheetah.image,cheetah.posX,cheetah.posY);
  },
};


cheetah.init();
canvas.init();
