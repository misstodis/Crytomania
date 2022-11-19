import { NavLoginbuttonAnimation } from './buttonAni.js';
import { getCoinInformation, getChartInfo } from './coinInfo.js';
import { loginUser, registerUser, getLocalStorageWithExpiry } from './user.js';
import { handleAddCoin } from './addCoinToWallet.js';

// get inloged user from sessionStorage
var user = getLocalStorageWithExpiry('user');

window.onload = () => {
  NavLoginbuttonAnimation();
  console.log($('#logo').closest('a').attr('href', window.location.origin));

  // when onlick tr from coins table
  $('.all-coin-table').on('click', 'tbody tr', function (e) {
    //when click on adding button in coins table
    if (e.target.matches('button')) {
      // is user not inloged, show login modal
      if (!user) {
        $('#login-modal').modal('show');
      } else {
        var coinName = e.target.closest('tr').getAttribute('data-coinid');
        var coinSymbol = e.target.getAttribute('data-coinsymbol');
        //change name label at input in addcoin modal
        $('#add-coin-form #coin-addon').html(coinName);
        //if inloged, show addcoin modal
        $('#modal-add-coin').modal('show');
        handleAddCoin(coinName, coinSymbol);
      }
    } else {
      // when click in all elements in tr ,except button
      //show chart modal
      $('#chart-modal').modal('show');
      getCoinInformation(this.getAttribute('data-coinId'));
      getChartInfo(this.getAttribute('data-coinId'));
    }
  });

  // user not inloged
  if (!user) {
    modalLoginHandle();
    // run function to login en register if user not logged in
    loginUser();
    registerUser();
  } else {
    // user already inloged
    $(document).ready(function () {
      //change icon on nav button
      $('#nav-login-button').html('<i class="bi bi-person-circle"></i>');
      $('#nav-login-button').on('click', () => {
        window.location.href = `${window.location.origin}/wallet.php`;
      });
    });

    //logout buttin click
    $('#logout-button').on('click', () => {
      Swal.fire({
        icon: 'success',
        text: 'Redirecting...',
        title: 'logout',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then(() => {
        localStorage.removeItem('user');
        window.location.href = window.location.origin;
      });
    });
  }

  function modalLoginHandle() {
    //show modal when clicked login in navbar
    $('#nav-login-button').on('click', () => {
      $('#login-modal').modal('show');
    });

    // event modal login form
    $('#login-modal').on('click', 'a', (e) => {
      $('#login-modal').modal('hide');
      $('#signup-modal').modal({
        show: false,
        backdrop: 'static',
      });
      $('#signup-modal').modal('show');
    });

    // event modal signup form
    $('#signup-modal').on('click', 'a', (e) => {
      $('#login-modal').modal('show');
      $('#signup-modal').modal('hide');
    });
  }
};
