<#include "base.ftl">

<#macro page_main>
<form method="post" action="/login">
  <p class="lead">Willkommen zum Gewinnspiel!</p>
  <input type="text" name="name" size="35" placeholder="Name"></p>
  <input type="text" name="firma" size="35" placeholder="Firma"></p>
  <p><input type="submit" value="Ahoi!"></p>
</form>
</#macro>

<@display_page/>
