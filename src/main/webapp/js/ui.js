var numberOfClicks;

$.get("/rest/player", function(data, status) {
 $("#welcome").html(data.username);
 numberOfClicks = data.numberOfClicks;
 $('#clickCounter').html(numberOfClicks);
});

function run_cheetah() {
  $.post("/rest/click", function(data, status) {
    numberOfClicks += 1;
    $("#clickCounter").html(numberOfClicks);
  });
}

function waitForStart() {
  $.get("/rest/game_started", function(data) {
    if (data == "true") {
      $("#runButton").removeAttr("disabled");
    } else {
      setTimeout(waitForStart, 80);
    }
  });
}

waitForStart();