<!-- chart -Modal -->
<div class="modal fade" id="chart-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" id="modal-dialog-coinInfo">
        <div class="modal-content">
            <div class="modal-body">
                <div id="coinInfo-js"></div>
                <br />
                <div class="coinChart">
                    <canvas id="coin-history-chart" width="300" height="300"></canvas>
                </div>
            </div>
        </div>
    </div>

</div>

<!-- template engine this go in to modal -->
<template id="js-info-coin" type="text/mustache">

    <div class="modal-header">
        <img src="https://assets.coincap.io/assets/icons/{{symbolLowerCase}}@2x.png" />
        <h2 class="modal-title" id="exampleModalLabel">{{name}} ({{symbol}})</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="price">
        <h5>Price: </h5><span>$ {{ priceUsd }}</span>
    </div>
    <div class="d-flex mt-3">
        <div class="flex-grow-1">
            <h5>Market cap</h5>
            <span>{{ marketCapSmall }}</span>
        </div>
        <div class="flex-grow-1">
            <h5>Volume usd 24Hr</h5>
            <span>{{ volumeSmall }}</span>
        </div>
        <div class="flex-grow-1">
            <h5>Supply</h5>
            <span>{{ supplySmall }}</span>
        </div>
    </div>
    <div id="js-render-chart">
    </div>
</template>