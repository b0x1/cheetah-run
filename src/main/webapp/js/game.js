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
  ["networkingBalloon.png", 32, 40],
  ["skystageBalloon.png", 64, 50],
];
var pictures = [];
for (var i = 0; i < pictureData.length; i++) {
  pictureData[i][0] = getImage(imagePrefix + pictureData[i][0]);

  pictureData[i][1] = (pictureData[i][1]);
}
pictureData[pictureData.length] = [ document.querySelector("#qrcode img") , -12, 20]; // QRCode


var canvas;
var cheetah;

window.onload = function() {
  PARAMETERS = getParameters();
  cheetah = new Cheetah(cheetahImages);
  for (var i = 0; i < pictureData.length; i++) {
    pictures[i] = new Picture(pictureData[i][0], pictureData[i][1], pictureData[i][2], pictureData[i][3]);
  }
  canvas = new AugmentedCanvas("cheetah-track", canvasBgImage, cheetah, pictures);

  drawTimeline();

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


// Function to draw a configurable timeline below the game (it draws only one time and gets moved in canvas.js in AugementedCanvas)
function drawTimeline(){
  /*
  timelineBigNumSteps: How often big numbers should be printed in the timeline (for example "=32" means every 32 steps)
  timelineSmallNumSteps: It says "num" because it was planned as a small num. Its actually a vertical line
  timelineStart: With which number the timeline starts
  timelineStop: might be obvious...
  timelineStartAndStopAlsoBig: If start and stop do not fit in the requirements for timelineBigNumSteps, but you still want to print them big, make it "true"
  timelineStepSize: the width of the elements
  timelineElementString: The html string with the timeline
  */
  var timelineBigNumSteps=32, timelineSmallNumSteps=8, timelineStart=0, timelineStop=PARAMETERS.maximumSteps, timelineStartAndStopAlsoBig=true, timelineStepSize=PARAMETERS.stepSize;
  var timelineElementString="";
  for(var i=timelineStart; i<=timelineStop; i++){
    // Start and Stop printed big, if enabled
    if((i==timelineStart || i==timelineStop) && timelineStartAndStopAlsoBig){
      timelineElementString+=   "<div class='timeLineBigNumContainer' style='float: left; width: "+(timelineStepSize)+"px;'>"
        +                           "<div class='timeLineVeryBigNumNumber' style='font-size: 30px; font-weight: bold; text-align: center;'>"
        +                           ""+i
        +                           "</div>"
        +                       "</div>"
    // Big numbers
    }else if(i%timelineBigNumSteps==0){
      timelineElementString+=   "<div class='timeLineBigNumContainer' style='float: left; width: "+(timelineStepSize)+"px; text-align: center;'>"
        +                           "<div class='timeLineBigNumNumber' style='text-align: center; width: "+(timelineStepSize)+"px; font-size: 18px; font-weight: bold; margin-top: 7px'>"
        +                           ""+i
        +                           "</div>"
        +                       "</div>"
    // Small "numbers"
    }else if(i%timelineSmallNumSteps==0){
      timelineElementString+=   "<div class='timeLineSmallNumContainer' style='float: left; width: "+timelineStepSize+"px'>"
        +                           "<div class='timeLineSmallNumBarContainer' style='width: "+(timelineStepSize)+"px;'>"
        +                           "<div class='timeLineSmallNumBar' style='width: "+(timelineStepSize/2-2)+"px; height: 30px; background-color: none; margin-top: 5px; float: left;'>"
        +                           "</div>"
        +                           "<div class='timeLineSmallNumBar' style='width: 4px; height: 30px; background-color: black; margin-top: 5px;float: left;'>"
        +                           "</div>"
        +                           "</div>"
        +                       "</div>"
    // If there is nothing to print, it prints a vertical line
    }else{
      timelineElementString+=   "<div style='height: 40px; width: 40px; float: left'><div style='float: left; height: 4px; width: "+(timelineStepSize)+"px; background-color: black; margin-top: "+(timelineStepSize/2-2)+"px;' > </div></div>"
    }
  }
  // Setting up the style of the timeline & its container + filling the html in it
  var timeline=document.getElementById('timeline')
  var timelineContainer=document.getElementById('timeline-container')
  timeline.innerHTML=timelineElementString
  timeline.style.width="auto"
  timeline.style.height="40px"
  timelineContainer.style.width="100%"
  timelineContainer.style.height="40px"
  timelineContainer.style.overflow="hidden"

  // -> Movement of the timeline is in canvas.js
}

function clickAction() {
  $.get("/rest/click/" + processedClick, function(data, status) {
    if (status == "success") {
      cheetah.run();
      canvas.textBubbles.push(new TextBubble(canvas.ctx, data.user.username + "(" + (processedClick+1) + ")",
        cheetah.posX + cheetah.width / 2, cheetah.posY - 30));
      canvas.draw();
      processedClick += 1;
    }

    if (processedClick >= PARAMETERS.maximumSteps) {
      canvas.draw();
      canvas.showWinScreen(data.user.username);
    } else {
      setTimeout(clickAction, 80);
    }

  });
}

window.focus();


