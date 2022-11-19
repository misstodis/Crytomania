<?php
include_once("./views/head.php");

?>

<h1>Exchange</h1>

<div class="d-flex flex-wrap mb-3 exchange-contain" id="js-exchanage-coin-content">

</div>


<template id="js-exchange-info" type=" text/mustache">
    {{#data}}
        {{ #volumeUsd }}
        <div class="card mt-3 animate__animated animate__zoomIn" style="width: 18rem;">
            <div class="card-header">
                <h3>#{{rank}}</h3>
            </div>
            <div class="card-body">
                <h5 class="card-title">{{name}}</h5>
                <p class="card-text"><strong>Volume: </strong> ${{ volumeUsd }} </p>
                <a href="{{exchangeUrl}}" class="btn btn-info ">More infomation</a>
            </div>
        </div>
        {{ /volumeUsd }}
    {{/data}}
</template>

<script type="module" src="./js/exhangeInfo.js"></script>
<?php
include_once("./views/footer.php");
?>