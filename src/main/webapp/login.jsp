<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>

<t:base>
<jsp:body>

<section>
<h1>Willkommen zum Gepardec-Gewinnspiel</h1>
<form method="post" action="/login">
  <p><label>Name: </label><input type="text" name="name" placeholder="Name"></p>
  <p><label>Firma: </label><input type="text" name="firma" placeholder="Firma"></p>
  <p><input type="submit" value="Hi"></p>
</form>
</section>

</jsp:body>
</t:base>