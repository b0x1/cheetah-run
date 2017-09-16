<#include "base.ftl">

<#macro page_main>
<#if !gameIsRunning>
<div id="alertBox" class="alert alert-info alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <strong>Info</strong> <span id="info-text">Warten Sie bitte auf den Spielstart!</span>
</div>
</#if>

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
          $("#alertBox").show();
          $("#runButton").attr("disabled", true);
        }
      });
    }

    function waitForStart() {
      $.get("/rest/game_running", function(data) {
        if (data == "true") {
          $("#runButton").removeAttr("disabled");
          $("#info-text").text("Spiel gestartet!");
          $('#alertBox').fadeOut(1000);
        } else {
          setTimeout(waitForStart, 80);
        }
      });
    }

    waitForStart();
</script>


</#macro>

<@display_page/>
