<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:base>
<jsp:body>

<section class="container">
  <t:header />
  <main class="text-center">
    <form method="post" action="/login">
      <p class="lead">Willkommen zum Gewinnspiel!</p>
      <input type="text" name="name" size="35" placeholder="Name"></p>
      <input type="text" name="firma" size="35" placeholder="Firma"></p>
      <p><input type="submit" value="Ahoi!"></p>
    </form>
  </main>
</section>

</jsp:body>
</t:base>