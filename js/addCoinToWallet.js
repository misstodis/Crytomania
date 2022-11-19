import { Validator } from './formvalidate/index.js';

function resetInputValue() {
  $('#amount-coins').val(0);
  $('#amount-money').val(0);
}
export function handleAddCoin(coinName, coinSymbol) {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  //set input value to 0
  resetInputValue();
  // function conver money to coin
  handleInputMoneyToCoin(coinSymbol);
  handleInputCoinsToMoney(coinSymbol);

  Validator({
    form: '#add-coin-form',
    errorSelector: '.form-message',
    formGroupSelector: '.form-group',
    rules: [
      Validator.isRequired('#amount-coins'),
      Validator.isRequired('#amount-money'),
      Validator.hasZeroValue('#amount-coins'),
      Validator.hasZeroValue('#amount-money'),
    ],
    onSubmit: function (value) {
      value.userId = currentUser.value.id;
      value.userName = currentUser.value.name;
      value.coinSymbol = coinSymbol;
      value.coinName = coinName;
      value.coinImage = `https://assets.coincap.io/assets/icons/${coinSymbol.toLowerCase()}@2x.png`;
      ajaxSendCoinToDatabase(value);
    },
  });
}

function ajaxSendCoinToDatabase(value) {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: './database/addCoinToWallet.php',
    data: { data: value },
    success: (rel) => {
      if (rel) {
        Swal.fire({
          icon: 'success',
          title: 'YEAH!',
          text: 'Coin successfully added to wallet!',
        }).then((result) => {
          if (result.isConfirmed) {
            resetInputValue();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: 'Some thing went wrong!',
        });
      }
    },
  });
}

export function handleInputMoneyToCoin(coinsymbol, moneySymbol = 'usd') {
  //check event on input base on id
  $('#amount-money').on('change keyup paste', function () {
    //get a promise response after API call
    var moneyConvert = convertAnyCurrencyFromTo(moneySymbol, coinsymbol, this.value);
    if (this.value > 0) {
      moneyConvert.then((response) => {
        $('#amount-coins').val(response[coinsymbol]);
      });
    } else {
      $('#amount-coins').val(0);
    }
  });
}

export function handleInputCoinsToMoney(coinsymbol, moneySymbol = 'usd') {
  //check event on input base on id
  $('#amount-coins').on('change keyup paste', async function () {
    //get a promise response after API call
    if (this.value > 0) {
      var coinConvert = convertAnyCurrencyFromTo(coinsymbol, moneySymbol, this.value);
      coinConvert.then(function (response) {
        $('#amount-money').val(Number(response.USD).toFixed(2));
      });
    } else {
      $('#amount-money').val(0);
    }
  });
}

export function convertAnyCurrencyFromTo(from, to, amount) {
  if (amount) {
    return $.ajax({
      type: 'GET',
      dataType: 'json',
      url: `https://api.coinconvert.net/convert/${from}/${to}?amount=${amount}`,
    });
  }
}
