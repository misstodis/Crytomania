import { getLocalStorageWithExpiry } from './user.js';
import { handleInputMoneyToCoin, handleInputCoinsToMoney } from './addCoinToWallet.js';
import { Validator } from './formvalidate/index.js';

// if user not logged in , rederect to home page
const user = getLocalStorageWithExpiry('user');
if (!user) {
  window.location.href = 'http://localhost/test/';
} else {
  $(document).ready(function () {
    getUserWallet();

    //click at button delete
    $('#table-wallet-content').on('click', 'tbody tr .js-delete-coin-wallet', function () {
      var coinId = this.getAttribute('data-deleteCoinId');
      var coinImage = $(this).closest('tr').find('.img-coins').attr('src');
      HandleDeleteCoin(coinId, coinImage);
    });

    //click at button edit
    $('#table-wallet-content').on('click', 'tbody tr .js-edit-coin-wallet', function () {
      var coinId = this.getAttribute('data-editCoinId');
      var coinName = $(this).closest('tr').find('.js-wallet-coin-name').text();
      var coinSymbol = $(this).closest('tr').find('.js-wallet-coin-symbol').text();
      var amountCoin = $(this).closest('tr').find('.js-wallet-amont-coins').text();
      var amountMoney = $(this).closest('tr').find('.js-wallet-amount-money').text();

      $('#edit-coin-form #coin-addon').html(coinName);
      //show modal edit coin
      $('#modal-edit-coin').modal('show');

      //update value of input field
      $('#amount-coins').val(Number(amountCoin));
      $('#amount-money').val(Number(amountMoney));

      HandleUpdateCoin(coinSymbol, coinId, user.id);
    });
  });
}

function getUserWallet() {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: './database/getWallet.php',
    data: { user },
    success: (rel) => {
      var userWallet = { data: rel };
      //get Template
      const templateChartModal = $('#js-wallet-info').html();
      //Render output with Mustache
      var renderChartModal = Mustache.render(templateChartModal, userWallet);
      $('#js-wallet-coin-content').html(renderChartModal);
    },
  });
}

function HandleDeleteCoin(coinId, coinImage) {
  Swal.fire({
    imageUrl: coinImage,
    title: 'Warning',
    text: 'Are you sure you want to delete this coin ?',
    showCancelButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      ajaxDeleteCoin(coinId);
    }
  });
}

function ajaxDeleteCoin(coinId) {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: './database/walletHandle.php',
    data: { data: { coinId, userId: user.id, action: 'delete' } },
    success: (rel) => {
      if (rel) {
        Swal.fire({
          icon: 'success',
          title: 'YEAH!',
          text: 'Coin successfully deleted',
        });
        //after delete coin rerender table
        getUserWallet();
      }
    },
  });
}

function HandleUpdateCoin(coinSymbol, coinId, userId) {
  //reuse function conver from addcoin
  handleInputMoneyToCoin(coinSymbol);
  handleInputCoinsToMoney(coinSymbol);

  Validator({
    form: '#edit-coin-form',
    errorSelector: '.form-message',
    formGroupSelector: '.form-group',
    rules: [
      Validator.isRequired('#amount-coins'),
      Validator.isRequired('#amount-money'),
      Validator.hasZeroValue('#amount-coins'),
      Validator.hasZeroValue('#amount-money'),
    ],
    onSubmit: function (value) {
      value.userId = userId;
      value.coinId = coinId;
      ajaxEditCoin(value);
    },
  });
}

function ajaxEditCoin(value) {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: './database/walletHandle.php',
    data: { data: { ...value, action: 'update' } },
    success: function (rel) {
      if (rel) {
        Swal.fire({
          icon: 'success',
          title: 'YEAH!',
          text: 'Coin successfully updated',
        });
        //after delete coin rerender table
        getUserWallet();
        $('#modal-edit-coin').modal('hide');
      }
    },
  });
}
