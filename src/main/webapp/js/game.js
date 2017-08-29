function getParameters() {
  return {
    canvas: {
      width: window.innerWidth,
      height: window.innerHeight < 851 ? window.innerHeight * 0.7 : 851
    },
    constant_run: window.innerWidth / 3,
    maximum_steps: 30, // 1024
  }
}

var PARAMETERS;
var processedClick = 0;

var getImage = function(src) {
  var image = new Image();
  image.src = src;

  return image;
};

var canvasBgImage = getImage(imagePrefix + "steppe.png");


var cheetahImages = [];
for (var i = 0; i < 17; i++) {
  cheetahImages[i] = getImage(imagePrefix + "cheetahRun" + i +".png");
}

var pictureData = [
  ["cateringBalloon.png", 10, 10],
  ["demoBalloon.png", 100, 20],
  ["iPadBalloon.png", 300, 30],
  ["networkingBalloon.png", 1000, 40],
  ["skystageBalloon.png", 1500, 50],
  ["speakerBalloon.png", 2300, 60]
];
var pictures = [];
for (var i = 0; i < pictureData.length; i++) {
  pictureData[i][0] = getImage(imagePrefix + pictureData[i][0]);
}


var canvas;
var cheetah;

window.onload = function() {
  PARAMETERS = getParameters();
  cheetah = new Cheetah(cheetahImages);
  for (var i = 0; i < pictureData.length; i++) {
    pictures[i] = new Picture(pictureData[i][0], pictureData[i][1], pictureData[i][2], pictureData[i][3]);
  }
  canvas = new AugmentedCanvas("cheetah-track", canvasBgImage, cheetah, pictures);

  canvas.draw();
//  clickAction();
}

window.onresize = function()  {
  PARAMETERS = getParameters();
  cheetah.resize();
  canvas.resize();
  for (var i=0; i < pictures.length; i++) {
    pictures[i].resize();
  }
  canvas.draw();
}

function clickAction() {
  $.get("/rest/click/" + processedClick, function(data, status) {
    if (status == "success") {
      cheetah.run();
      canvas.textBubbles.push(new TextBubble(canvas.ctx, data.user.username + "(" + processedClick + ")",
        cheetah.posX + 30, cheetah.posY - 30));
      canvas.draw();
      processedClick += 1;
    }

    if (processedClick >= PARAMETERS.maximum_steps) {
      canvas.textBubbles.push(new TextBubble(canvas.ctx, "Spiel zu Ende!",
                                      PARAMETERS.canvas.width/3, PARAMETERS.canvas.height/4 , true));
      canvas.draw();
    } else {
      setTimeout(clickAction, 80);
    }

  });
}

// Test code
 window.onkeypress = function(evt) {
   cheetah.run();
   canvas.textBubbles.push(new TextBubble(canvas.ctx, evt.key, cheetah.posX + 30, cheetah.posY - 30));
   processedClick += 1;
   if (processedClick >= PARAMETERS.maximum_steps) {
     stopGame();
   } else {
     canvas.draw();
   }
 };
// End test code

window.focus();

var stopGame = function() {
  window.onkeypress = undefined;
  clearInterval(canvas.animate);
}



