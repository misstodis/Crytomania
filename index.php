<?php
include_once("./views/head.php");

//inlcude chart modal
include_once("./views/Modal/chartModal.php");

// include modal adding coin
include_once("./views/Modal/modalAddCoin.php");

?>
<table class="table table-fit table-hover text-dark mt-5 coins-table all-coin-table" id="coins-table">
    <thead>
        <tr>
            <th scope="col" id="th-table-short">Short</th>
            <th scope="col">Coin</th>
            <th scope="col">Price Usd</th>
            <th scope="col" id="th-table-price-euro">Price Euro</th>
            <th scope="col" id="th-table-market">Market Cap</th>
            <th scope="col">%24hr</th>
            <th scope="col">Add to Wallet</th>
        </tr>
    </thead>
    <tbody id="js-coins-content">
    </tbody>
</table>

<template id="js-coins-table-info" type=" text/mustache">
    {{ #data}}
    <tr data-coinId="{{ id }}" class="animate__animated animate__zoomIn ">
        <td class="coin-symbol">{{ symbol }}</td>
        <td><img class="img-coins" src="{{ imageUrl }}">{{ id }}</td>
        <td>$ {{ priceUsd }}</td>
        <td class="coin-price-euro">€ {{ priceEuro }}</td>
        <td class="coin-market-cap"><strong>$</strong> {{ marketCapUsd }} b</td>
        <td>
            {{ #isCoinUp }}
            <span class="text-success"> {{ changePercent24Hr   }}</span>
            {{ /isCoinUp  }}
            {{ ^isCoinUp }}
            <span class="text-danger"> {{ changePercent24Hr   }}</span>
            {{ /isCoinUp  }}
        </td>
        <td><button class="btn btn-custom-primary btn-add-coin" data-coinsymbol="{{symbol}}">Add to wallet</button></td>
    </tr>
    {{/data }}
</template>
<?php include_once("./views/preload/index.php"); ?>

<script type=" module" src="./js/coinInfo.js">
</script>
<?php
include_once("./views/footer.php");
?>