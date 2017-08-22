$.get("/rest/player", function(data, status) {
  $("#welcome").html(data.username);
})

function run_cheetah() {
  $.post("/rest/click", )
}