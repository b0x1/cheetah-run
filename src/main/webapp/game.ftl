<#include "WEB-INF/templates/base.ftl">

<#macro body>
  <main id="qrcode" style="display: none;"></main>
  <#-- QRCode generator -->
  <script src="/js/qrcode.js"></script>
  <script type="text/javascript">
    new QRCode(document.getElementById("qrcode"), window.location.host);
  </script>

  <section>
    <div id="win-screen" style="visibility: hidden;">
        <img src="images/imgYouWon.jpg" style="visibility: hidden;" />
    </div>
    <canvas id="cheetah-track">
      Glory to HTML5 Canvas!
    </canvas>
    <div id="timeline-container">
        <div id="timeline">
        </div>
    </div>
    <script type="text/javascript">
      var imagePrefix = "images/";
    </script>
    <script type="text/javascript" src="js/parameters.js"></script>
    <script type="text/javascript" src="js/canvas.js"></script>
    <script type="text/javascript" src="js/cheetah.js"></script>
    <!--<script type="text/javascript" src="js/animate.js"></script>-->
    <script type="text/javascript" src="js/canvasobjects.js"></script>
    <script type="text/javascript" src="js/game.js"></script>
  </section>

</#macro>

<@display_page/>
