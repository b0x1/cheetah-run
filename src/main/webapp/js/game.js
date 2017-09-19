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
  ["erhard.png", 0 + 25, 0.2],
  ["herbert.png", 0 + 45, 0.35],
  ["egor.png", 0 + 70, 0.18, 0.75],
  ["adrian.png", 274 + 20, 0.5],
  ["werner.png", 336 + 30, 0.2, 0.64],
  ["adam.png", 488 + 8, 0.48],
  ["gunter.png", 579 - 15, 0.2],
  ["evelyn.png", 579 + 11, 0.18],
  ["mario_marko.png", 632 + 57, 0.2],
  ["chris.png", 778 + 30, 0.4, 0.7],
  ["matthias.png", 778 + 16, 0.1, 0.7],
  ["sabrina.png", 794 + 30, 0.2, 0.52],
  ["klemens.png", 856 + 20, 0.2, 0.55],
  ["boyang.png", 856 + 81, 0.2, 0.75],
  ["erich.png", 884 + 85, 0.18],
  ["christoph.png", 958 + 40, 0.18, 0.7]
];

[
  ["erhard.png", 0],
  ["herbert.png", 0],
  ["egor.png", 0],
  ["adrian.png", 274],
  ["werner.png", 336],
  ["adam.png", 488],
  ["gunter.png", 579],
  ["evelyn.png", 579],
  ["marko.png", 603],
  ["mario.png", 666],
  ["chris.png", 778],
  ["matthias.png", 778],
  ["sabrina.png", 794],
  ["klemens.png", 856],
  ["boyang.png", 856],
  ["erich.png", 884]
  ["ruhsam.png", 958]
];
var pictures = [];
for (var i = 0; i < pictureData.length; i++) {
  pictureData[i][0] = getImage(imagePrefix + pictureData[i][0]);

  pictureData[i][1] = (pictureData[i][1]);
}
pictureData[pictureData.length] = [ document.querySelector("#qrcode img") , -2, 0.4, 0.5]; // QRCode


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
  clickAction();
};

window.onresize = function()  {
  PARAMETERS = getParameters();
  cheetah.resize();
  canvas.resize();
  for (var i=0; i < pictures.length; i++) {
    pictures[i].resize();
  }
  canvas.draw();
};

function clickAction() {
  $.get("/rest/click/" + processedClick, function(data, status) {
    if (status == "success") {
      cheetah.run();
      canvas.textBubbles.push(new TextBubble(canvas.ctx, data.user.fullName + " (" + (processedClick+1) + ")",
        cheetah.posX + cheetah.width / 2, cheetah.posY - 30));
      canvas.draw();
      processedClick += 1;
    }

    if (processedClick >= PARAMETERS.maximumSteps) {
      canvas.draw();
      canvas.showWinScreen(data.user.fullName);
    } else {
      setTimeout(clickAction, 80);
    }
  });
}

window.focus();


