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
//  image.onload = function() {
//    console.log("Image " + src + " loaded.");
//  };
  return image;
};

var canvasBgImage = getImage(imagePrefix + "steppe.png");


var cheetahImages = [];
for (var i = 0; i < 17; i++) {
  cheetahImages[i] = getImage(imagePrefix + "cheetahRun" + i +".png");
}

var canvas;
var cheetah;

window.onload = function() {
  PARAMETERS = getParameters();
  cheetah = new Cheetah(cheetahImages);
  canvas = new Canvas("cheetah-track", canvasBgImage, cheetah);
  clickAction();
  canvas.draw();
}

window.onresize = function()  {
  PARAMETERS = getParameters();
  cheetah.resize();
  canvas.resize();
  canvas.draw();
}

function clickAction() {
  $.get("/rest/click/" + processedClick, function(data, status) {
    if (status == "success") {
      cheetah.run();
      canvas.draw(data.user.username);

      processedClick += 1;
    }

    setTimeout(clickAction, 80);
  });
};

window.focus();

var stopGame = function() {
  window.onkeypress = null;
  clearInterval(canvas.animate);
  clearInterval(cheetah.animate); // Compatibility issue with Cheetah
}



