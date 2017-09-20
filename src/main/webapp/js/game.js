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
  ["egor.png", 0 + 65, 0.05, 0.75],
  ["adrian.png", 274 + 19, 0.5],
  ["werner.png", 336 + 37, 0.08, 0.68],
  ["adam.png", 488 + 18, 0.48],
  ["gunter.png", 579 - 14, 0.22],
  ["evelyn.png", 579 + 21, 0.12, 0.65],
  ["mario_marko.png", 632 + 72, 0.2],
  ["chris.png", 778 + 32, 0.4, 0.7],
  ["matthias.png", 778 + 18, 0.1, 0.75],
  ["sabrina.png", 794 + 25, 0.05, 0.7],
  ["klemens.png", 856 + 35, 0.2, 0.55],
  ["boyang.png", 856 + 97, 0.22, 0.75],
  ["erich.png", 884 + 102, 0.18],
  ["christoph.png", 958 + 57, 0.15, 0.7]
];

/*
for (var i = 0; i < pictureData.length; i++) {
  var p = pictureData[i];
  console.log(p[0].charAt(0).toUpperCase() + p[0].split(".")[0].slice(1) + ": " + p[1]);
}

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
*/

var pictures = [];
for (var i = 0; i < pictureData.length; i++) {
  pictureData[i][0] = getImage(imagePrefix + pictureData[i][0]);

  pictureData[i][1] = (pictureData[i][1]);
}

pictureData[pictureData.length] = [document.querySelector("#qrcode img") , -2, 0.4, 0.5]; // QRCode


var canvas;
var cheetah;

window.onload = function() {
  PARAMETERS = getParameters();
  cheetah = new Cheetah(cheetahImages);
  for (var i = 0; i < pictureData.length; i++) {
    pictures[i] = new Picture(pictureData[i][0], pictureData[i][1], pictureData[i][2], pictureData[i][3]);
  }
  canvas = new AugmentedCanvas("cheetah-track", canvasBgImage, cheetah, pictures);

  canvas.textBubbles.push(new TextBubble(canvas.ctx, "http://tinyurl.com/gepardec-run",
                                          (cheetah.width)/2 + 17, canvas.height*0.08, true, "30pt Arial"));
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


