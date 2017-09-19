<#include "base.ftl">

<#macro page_main>
<div id="alertBox" class="alert alert-info alert-dismissible fade" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Info</strong> <span id="info-text">Warten Sie bitte auf den Spielstart!</span>
</div>

<p class="lead">Hallo ${player}!</p>
<button id="runButton" type="button" class="btn btn-lg btn-primary" onclick="run_cheetah()" disabled>Lauf, Gepard, lauf!</button>
<p>Sie haben <span id="clickCounter">${clicks}</span>-mal geklickt.</p>

<script type="application/javascript" src="/js/parameters.js"></script>
<script type="application/javascript">
    var numberOfClicks = ${clicks};
    var PARAMETERS = getParameters();

    function run_cheetah() {
      $.post("/rest/click", function(data, status) {
        if (status == "success") {
          $("#clickCounter").html(data);
        }
        if (status == "nocontent" || data >= PARAMETERS.maximumSteps) {
          $("#info-text").text("Das Spiel ist zu Ende!");
          $("#alertBox").removeClass("fade");
          $("#runButton").attr("disabled", true);
        }
      });
    }

    function loadUI() {
      $.get("/rest/game_state", function(data) {
        if (data == 1) {
          $("#runButton").removeAttr("disabled");
          $("#info-text").text("Spiel gestartet!");
          $("#alertBox").addClass("fade");
        } else if (data == 2) {
          $("#info-text").text("Das Spiel ist zu Ende!");
          $("#alertBox").removeClass("fade");
        } else {
          $("#alertBox").removeClass("fade");
          setTimeout(loadUI, 50);
        }
      });
    }

    loadUI();
</script>


</#macro>

<@display_page/>
