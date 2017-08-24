<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:base>
<jsp:body>
  <section class="container">
    <t:header />
    <main class="text-center">
      <p class="lead">Hallo <span id="welcome"></span>!</p>
      <button class="btn btn-default" type="button" onclick="run_cheetah()">Run, Cheetah, run!</button>
      <p>You have clicked <span id="clickCounter">0</span> times.</p>
    </main>
  </section>

  <script type="application/javascript" src="js/ui.js"></script>
</jsp:body>
</t:base>
