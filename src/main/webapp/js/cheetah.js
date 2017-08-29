
Cheetah = function(images) {
  this.images = images;
  this.imagePos = 0;
  this.image = this.images[this.imagePos];
  this.stepSize = 100;
  this.posX = 0;
  this.steps = 0;

  this.resize();
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

  rotateImages: function() {
    this.imagePos += 1;
    this.imagePos %= this.images.length + 2;
    if (this.imagePos < this.images.length) {
      this.image = this.images[this.imagePos];
    } else {
      this.image = this.images[0];
    }
//    console.log(this.imagePos + " " + this.image.src);
  },

  run : function() {
    // Move Cheetah on screen
    if ((this.steps * this.stepSize < PARAMETERS.constant_run ||
         this.steps >= PARAMETERS.maximum_steps - (PARAMETERS.canvas.width - PARAMETERS.constant_run - this.width) / this.stepSize) &&
         this.steps < PARAMETERS.maximum_steps) {
      this.posX += this.stepSize;
    }

    if (this.steps < PARAMETERS.maximum_steps) {
      this.steps += 1;
      this.rotateImages();
    }
  }
}


RunningCheetah = function(images) {
  Cheetah.call(this, images);
  this.posX = PARAMETERS.constant_run - this.width / 2;
}

RunningCheetah.prototype = Object.create(Cheetah.prototype);
RunningCheetah.prototype.constructor = RunningCheetah;
RunningCheetah.prototype.run = function() {
  this.rotateImages();
}
RunningCheetah.prototype.resize = function() {
  Cheetah.prototype.resize.call(this);
  this.posX = PARAMETERS.constant_run - this.width / 2;
}
