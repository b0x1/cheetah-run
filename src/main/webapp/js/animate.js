function getParameters() {
  return {
    canvas: {
      width: window.innerWidth,
      height: window.innerHeight < 227 ? window.innerHeight : 227
    },
    constantRun: window.innerWidth / 2
  };
}

var PARAMETERS;

var getImage = function(src) {
  var image = new Image();
  image.src = src;
  return image;
};


var cheetahImages = [];
for (var i = 0; i < 17; i++) {
  cheetahImages[i] = getImage(imagePrefix + "cheetahRun" + i +".png");
}

var canvas;
var cheetah;

window.onload = function() {
  PARAMETERS =  getParameters();
  cheetah = new RunningCheetah(cheetahImages);
  canvas = new RotatingCanvas("cheetah-track", getImage(imagePrefix + "steppe_small.png"), cheetah);
  canvas.animate = setInterval(canvas.draw.bind(canvas), 50);
  cheetah.animate = setInterval(cheetah.run.bind(cheetah), 60);
};

window.onresize = function()  {
  PARAMETERS = getParameters();
  cheetah.resize();
  canvas.resize();
};

var stopGame = function() {
  clearInterval(canvas.animate);
  clearInterval(cheetah.animate); // Compatibility issue with Cheetah
  for (var i = 0; i < balloonImages.length; i++) {
    clearInterval(balloons[i]);
  }
};



