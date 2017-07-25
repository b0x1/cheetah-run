
Cheetah = function(images) {
  this.images = images;
  this.imagePos = 0;
  this.image = this.images[this.imagePos];
  this.stepSize = 100;
  this.posX = 0;
  this.distance = this.posX;
  this.lastkey;

  this.resize();
  window.onkeypress = this.run.bind(this);

}

Cheetah.prototype = {
  constructor: Cheetah,
  resize: function() {
    if (PARAMETERS.canvas.height < PARAMETERS.canvas.width) {
      this.height = PARAMETERS.canvas.height * 0.3;;
      this.width = this.image.width / this.image.height * this.height;
    } else {
      this.width = this.image.width < PARAMETERS.canvas.width ? this.image.width : PARAMETERS.canvas.width;
      this.width -= 30;
      this.height = this.image.height / this.image.width * this.width;
    }


    this.posY = PARAMETERS.canvas.height - this.height - 10;
  },

  rotateImage: function() {
    this.imagePos += 1;
    this.imagePos %= 17;
    if (this.imagePos < 7) {
      this.image = this.images[this.imagePos];
    } else if (this.imagePos < 14) {
      this.image = this.images[14 - this.imagePos];
    } else {
      this.image = this.images[0];
    }
  },

  run : function(evt) {
    // Move Cheetah on screen
    if (this.posX + this.stepSize <= PARAMETERS.constant_run || this.distance >= FINAL_SPURT) {
      this.posX += this.stepSize;
    }

    // Distance Cheetah has run.
    this.distance += this.stepSize;
    this.lastkey = evt.key;
    this.rotateImage();
  }
}


RunningCheetah = function(images) {
  Cheetah.call(this, images);
  this.posX = PARAMETERS.constant_run - this.width / 2;
}

RunningCheetah.prototype = Object.create(Cheetah.prototype);
RunningCheetah.prototype.constructor = RunningCheetah;
RunningCheetah.prototype.run = function() {
  this.rotateImage();
}
RunningCheetah.prototype.resize = function() {
  Cheetah.prototype.resize.call(this);
  this.posX = PARAMETERS.constant_run - this.width / 2;
}
