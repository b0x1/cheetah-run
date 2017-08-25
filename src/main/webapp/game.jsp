<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:base>
<jsp:body>

  <section>
    <canvas id="cheetah-track">
      Glory to HTML5 Canvas!
    </canvas>
    <script type="text/javascript">
    var imagePrefix = "images/";
    </script>
    <script type="text/javascript" src="js/canvas.js"></script>
    <script type="text/javascript" src="js/cheetah.js"></script>
    <!--<script type="text/javascript" src="js/balloon.js"></script>-->
    <!--<script type="text/javascript" src="js/animate.js"></script>-->
    <script type="text/javascript" src="js/textbubble.js"></script>
    <script type="text/javascript" src="js/game.js"></script>
  </section>

</jsp:body>
</t:base>