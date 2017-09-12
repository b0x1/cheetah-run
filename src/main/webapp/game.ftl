<#include "WEB-INF/templates/base.ftl">

<#macro body>
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
    <style>
      #win-screen{

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        text-alignment: center;
        vertical-alignment: middle;
        font-size: 50px;

        background-image: url("images/imgYouWon.jpg");
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    </style>
    <script type="text/javascript">
    var imagePrefix = "images/";
    </script>
    <script type="text/javascript" src="js/canvas.js"></script>
    <script type="text/javascript" src="js/cheetah.js"></script>
    <!--<script type="text/javascript" src="js/animate.js"></script>-->
    <script type="text/javascript" src="js/canvasobjects.js"></script>
    <script type="text/javascript" src="js/game.js"></script>
  </section>
</#macro>

<@display_page/>
