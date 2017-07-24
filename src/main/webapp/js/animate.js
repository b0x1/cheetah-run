
cheetah = new RunningCheetah(
      ["images/cheetahRun00.png",
       "images/cheetahRun00.png",
       "images/cheetahRun00.png",
       "images/cheetahRun01.png",
       "images/cheetahRun02.png",
       "images/cheetahRun03.png",
       "images/cheetahRun04.png",
       "images/cheetahRun05.png",
       "images/cheetahRun06.png",
       "images/cheetahRun07.png",
       "images/cheetahRun06.png",
       "images/cheetahRun05.png",
       "images/cheetahRun04.png",
       "images/cheetahRun03.png",
       "images/cheetahRun02.png",
       "images/cheetahRun01.png"]);

balloonImages = [
  "cateringBalloon.png",
  "demoBalloon.png",
  "iPadBalloon.png",
  "networkingBalloon.png",
  "skystageBalloon.png",
  "speakerBalloon.png"
];

balloons = [];
for (i = 0; i < balloonImages.length; i++) {
  balloons[i] = new Balloon("images/" + balloonImages[i], 100, 100, 1600);
}

canvas = new RotatingCanvas("cheetah-track", "images/steppe_v2.png", cheetah, balloons);


var stopGame = function() {
  window.onkeypress = null;
  clearInterval(canvas.animate);
  clearInterval(cheetah.animate); // Compatibility issue with Cheetah
}


var CONSTANT_RUN = 400;
var FINAL_SPURT = canvas.background.width - canvas.width;
var CANVAS_WIDTH = canvas.width;
var TOTAL_DISTANCE = canvas.background.width;


