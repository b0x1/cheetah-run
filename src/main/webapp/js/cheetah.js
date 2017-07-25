
Cheetah = function(images) {
  this.images = images;
  this.imagePos = 0;
  this.image = this.images[this.imagePos];
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
    console.log(this.image.src);
  },

  run : function(evt) {
    // Move Cheetah on screen
    if (this.posX + this.stepSize <= CONSTANT_RUN || this.distance >= FINAL_SPURT) {
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
  this.posX = CONSTANT_RUN;
}

RunningCheetah.prototype = Object.create(Cheetah.prototype);
RunningCheetah.prototype.run = function() {
  this.rotateImage();
}
