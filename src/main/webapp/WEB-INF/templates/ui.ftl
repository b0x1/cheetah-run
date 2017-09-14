<#include "base.ftl">

<#macro page_main>
<p class="lead">Hallo ${player}!</p>
<button id="runButton" type="button" class="btn btn-lg btn-primary" onclick="run_cheetah()" disabled>Lauf, Gepardec, lauf!</button>
<p>Sie haben <span id="clickCounter">0</span>-mal geklickt.</p>
<script type="application/javascript">
    var numberOfClicks = ${clicks};

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
</script>


</#macro>

<@display_page/>
