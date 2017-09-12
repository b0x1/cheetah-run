<#include "base.ftl">

<#macro page_main>
<p class="lead">Hallo <span id="welcome"></span>!</p>
<button class="btn btn-default" type="button" onclick="run_cheetah()">Run, Cheetah, run!</button>
<p>You have clicked <span id="clickCounter">0</span> times.</p>
<script type="application/javascript" src="js/ui.js"></script>
</#macro>

<@display_page/>
