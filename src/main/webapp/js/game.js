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

var canvas;
var cheetah;

window.onload = function() {
  PARAMETERS = getParameters();
  cheetah = new Cheetah(cheetahImages);
  canvas = new AugmentedCanvas("cheetah-track", canvasBgImage, cheetah);
  canvas.draw();
  clickAction();
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
// window.onkeypress = function(evt) {
//   cheetah.run();
//   canvas.textBubbles.push(new TextBubble(canvas.ctx, evt.key, cheetah.posX + 30, cheetah.posY - 30));
//   processedClick += 1;
//   if (processedClick >= PARAMETERS.maximum_steps) {
//     stopGame();
//   } else {
//     canvas.draw();
//   }
// };
// End test code

window.focus();

var stopGame = function() {
  window.onkeypress = undefined;
  clearInterval(canvas.animate);
}



