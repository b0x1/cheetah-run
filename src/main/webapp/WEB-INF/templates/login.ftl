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
  <input type="text" name="name" size="35" placeholder="Name"></p>
  <input type="text" name="firma" size="35" placeholder="Firma"></p>
  <p><input type="submit" value="Ahoi!"></p>
</form>
</#macro>

<@display_page/>
