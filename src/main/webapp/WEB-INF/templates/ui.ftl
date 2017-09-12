<#include "base.ftl">

<#macro page_main>
<p class="lead">Hallo <span id="welcome"></span>!</p>
<button class="btn btn-default" type="button" onclick="run_cheetah()">Lauf, Cheetah, lauf!</button>
<p>Sie haben <span id="clickCounter">0</span>-mal geklickt.</p>
<script type="application/javascript" src="js/ui.js"></script>
</#macro>

<@display_page/>
