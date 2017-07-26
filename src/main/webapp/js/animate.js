function getParameters() {
  return {
    canvas: {
      width: window.innerWidth,
      height: window.innerHeight < 851 ? window.innerHeight : 851
    },
    constant_run: window.innerWidth / 2
  }
}

var PARAMETERS = getParameters();
var FINAL_SPURT;

var getImage = function(src) {
  var image = new Image();
  image.src = src;
//  image.onload = function() {
//    console.log("Image " + src + " loaded.");
//  };
  return image;
};


var cheetahImages = [];
for (var i = 0; i < 17; i++) {
  cheetahImages[i] = getImage(imagePrefix + "cheetahRun" + i +".png");
}


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
  balloonImages[i] = getImage(imagePrefix + balloonImages[i]);
}

var bgImage = getImage(imagePrefix + "steppe_v2.png");

var canvas;
var cheetah;


window.onload = function() {
  cheetah = new RunningCheetah(cheetahImages);
  canvas = new RotatingCanvas("cheetah-track", bgImage, cheetah, balloons);
  for (var i = 0; i < balloonImages.length; i++) {
    balloons[i] = new Balloon(balloonImages[i]);
  }
  FINAL_SPURT = canvas.background.width - canvas.width;
}

window.onresize = function()  {
  PARAMETERS = getParameters();
  cheetah.resize();
  canvas.resize();
  for (var i = 0; i < balloons.length; i++) {
    balloons[i].resize();
  }
}

var stopGame = function() {
  window.onkeypress = null;
  clearInterval(canvas.animate);
  clearInterval(cheetah.animate); // Compatibility issue with Cheetah
  for (var i = 0; i < balloonImages.length; i++) {
    clearInterval(balloons[i]);
  }
}



