<#include "base.ftl">

<#macro page_main>
<form method="post" action="/">
  <p class="lead">Willkommen zum Gewinnspiel!</p>
  <#if errorTitle?? >
  <div class="alert alert-warning alert-dismissible show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <strong>${errorTitle}</strong> ${errorMessage}
  </div>
  </#if>
  <input type="text" name="firstName" size="35" placeholder="Vorname"></p>
  <input type="text" name="lastName" size="35" placeholder="Nachname"></p>
  <p><input type="submit" class="btn btn-primary" value="Ahoi!"></p>
</form>
</#macro>

<@display_page/>
