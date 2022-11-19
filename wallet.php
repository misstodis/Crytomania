<?php
include_once("./views/head.php");
// include modal adding coin
include_once("./views/Modal/modalEditCoin.php");
?>



<div class="mt-3">
    <h1>Wallet</h1>
</div>
<button class="btn btn-danger" id="logout-button"> logout</button>
<!-- using template engine muschajs -->
<template id="js-wallet-info" type=" text/mustache">
    {{#data}}
        <tr>
            <td class="text-capitalize animate__animated animate__jackInTheBox js-wallet-coin-name">{{coinName}}</td>
            <td><img class=" animate__animated animate__rubberBand img-coins" src='{{coinImage}}' alt="coinImage"></td>
            <td class=" animate__animated animate__jackInTheBox"> <span class="js-wallet-amont-coins">{{ totalCoin }} </span><span class="js-wallet-coin-symbol">{{ coinSymbol }}</span></td>
            <td class=" animate__animated animate__jackInTheBox ">$ <span class="js-wallet-amount-money">{{ totalMoney }}</span></td>
            <td><button class="btn btn-info js-edit-coin-wallet" data-editCoinId="{{ id }}">Edit</button></td>
            <td><button class="btn btn-danger js-delete-coin-wallet" data-deleteCoinId="{{ id }}">Delete</button></td>
        </tr>
    {{/data}}
</template>


<table class="table table-fit table-hover text-dark mt-5 coins-table" id="table-wallet-content">
    <thead>
        <tr>
            <th scope="col" class="fs-5">Name</th>
            <th scope="col" class="fs-5">Coin</th>
            <th scope="col"><i class="bi bi-coin fs-5"></i></th>
            <th scope="col"><i class="bi bi-cash-coin fs-5"></i></th>
            <th scope="col" class="fs-5">Edit</th>
            <th scope="col" class="fs-5">Delete</th>
        </tr>
    </thead>
    <tbody id="js-wallet-coin-content">

    </tbody>
</table>


<script type="module" src="./js/walletInfo.js"></script>

<?php
include_once("./views/footer.php");
?>