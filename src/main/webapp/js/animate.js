var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = 851;
var CONSTANT_RUN = CANVAS_WIDTH / 3;
var FINAL_SPURT;


var getImage = function(src) {
  var image = new Image();
  image.src = src;
  image.onload = function() {
    console.log("Image " + src + " loaded.");
  };
  return image;
};


var cheetahImages = [];
for (var i = 0; i < 8; i++) {
  cheetahImages[i] = getImage(imagePrefix + "cheetahRun0" + i +".png");
}

var cheetah = new RunningCheetah(cheetahImages);

var balloonImages = [
  "cateringBalloon.png",
  "demoBalloon.png",
  "iPadBalloon.png",
  "networkingBalloon.png",
  "skystageBalloon.png",
  "speakerBalloon.png"
];
var balloons = [];
for (var i = 0; i < balloonImages.length; i++) {
  balloons[i] = new Balloon(getImage(imagePrefix + balloonImages[i]), 100, 100, CANVAS_WIDTH);
}

var canvas;

window.onload = function() {
  canvas = new RotatingCanvas("cheetah-track", getImage(imagePrefix + "steppe_v2.png"), cheetah, balloons);
  FINAL_SPURT = canvas.background.width - canvas.width;
}

var stopGame = function() {
  window.onkeypress = null;
  clearInterval(canvas.animate);
  clearInterval(cheetah.animate); // Compatibility issue with Cheetah
}



