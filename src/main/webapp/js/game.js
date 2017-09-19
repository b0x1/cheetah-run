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
  ["erhard.png", 0 + 10, 0.26],
  ["herbert.png", 0 + 20, 0.45],
  ["egor.png", 0 + 30, 0.2],
  ["adrian.png", 274, 0.5],
  ["werner.png", 336, 0.2],
  ["adam.png", 488, 0.5],
  ["gunter.png", 579, 0.2],
  ["evelyn.png", 579 + 10, 0.2],
  ["mario_marko.png", 632, 0.2],
  ["chris.png", 778, 0.5],
  ["matthias.png", 778, 0.2],
  ["sabrina.png", 794, 0.3],
  ["klemens.png", 856, 0.2],
  ["boyang.png", 856 + 10, 0.2],
  ["erich.png", 884, 0.18],
  ["christoph.png", 958, 0.2]
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
pictureData[pictureData.length] = [ document.querySelector("#qrcode img") , 0, 0.4, 0.5]; // QRCode


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


