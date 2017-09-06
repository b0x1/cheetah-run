function getParameters() {
  return {
    canvas: {
      width: window.innerWidth,
      height: window.innerHeight < 851 ? window.innerHeight * 0.7 : 851
    },
    constantRun: window.innerWidth / 2
  }
}

var PARAMETERS;

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

var canvas;
var cheetah;

window.onload = function() {
  PARAMETERS =  getParameters();
  cheetah = new RunningCheetah(cheetahImages);
  canvas = new RotatingCanvas("cheetah-track", getImage(imagePrefix + "steppe.png"), cheetah, balloons);
  for (var i = 0; i < balloonImages.length; i++) {
    balloons[i] = new Balloon(balloonImages[i]);
  }

  canvas.animate = setInterval(canvas.draw.bind(canvas), 50);
  cheetah.animate = setInterval(cheetah.run.bind(cheetah), 60);
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
  clearInterval(canvas.animate);
  clearInterval(cheetah.animate); // Compatibility issue with Cheetah
  for (var i = 0; i < balloonImages.length; i++) {
    clearInterval(balloons[i]);
  }
}



