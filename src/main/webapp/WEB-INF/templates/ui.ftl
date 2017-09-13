<#include "base.ftl">

<#macro page_main>
<p class="lead">Hallo <span id="welcome"></span>!</p>
<button id="runButton" type="button" class="btn btn-lg btn-primary" onclick="run_cheetah()" disabled>Lauf, Cheetah, lauf!</button>
<p>Sie haben <span id="clickCounter">0</span>-mal geklickt.</p>
<script type="application/javascript" src="js/ui.js"></script>
</#macro>

<@display_page/>
