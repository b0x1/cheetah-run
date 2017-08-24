var numberOfClicks;

$.get("/rest/player", function(data, status) {
 $("#welcome").html(data.username);
 numberOfClicks = data.numberOfClicks;
 $('#clickCounter').html(numberOfClicks);
});

function run_cheetah() {
  $.post("/rest/click");
  numberOfClicks += 1;
  $("#clickCounter").html(numberOfClicks);
}