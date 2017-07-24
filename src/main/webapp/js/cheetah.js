
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
  this.animate = setInterval(this.run.bind(this), 80);

}

Cheetah.prototype = {
  rotateImage: function() {
    // Rotate images
    this.imagePos += 1;
    this.imagePos %= this.imageSources.length;
    this.image.src = this.imageSources[this.imagePos];

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


RunningCheetah = function(imageSources) {
  Cheetah.call(this, imageSources);
  this.posX = 400;
}

RunningCheetah.prototype = Object.create(Cheetah.prototype);
RunningCheetah.prototype.run = function() {
  this.rotateImage();
}
