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
  ["Sabrina_Jutz_cheetahrun.png", 32, 40],
];
var pictures = [];
for (var i = 0; i < pictureData.length; i++) {
  pictureData[i][0] = getImage(imagePrefix + pictureData[i][0]);

  pictureData[i][1] = (pictureData[i][1]);
}
pictureData[pictureData.length] = [ document.querySelector("#qrcode img") , 0, 20]; // QRCode


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


