import { Validator } from './formvalidate/index.js';

export function loginUser() {
  //login form validation
  Validator({
    form: '#login-form',
    errorSelector: '.form-message',
    formGroupSelector: '.form-group',
    rules: [
      Validator.isRequired('#name'),
      Validator.hasWhiteSpace('#name'),
      Validator.minLength('#name', 6, 'Username need to be at least 6 characters long'),

      Validator.isRequired('#password'),
      Validator.upperCaseLetter('#password'),
      Validator.lowerCaseLetter('#password'),
      Validator.specialCharacter('#password'),
      Validator.minNumberPass('#password'),
      Validator.hasWhiteSpace('#password'),
      Validator.minLength('#password', '6', 'Password need to be at least 6 characters long'),
    ],
    onSubmit: function (value) {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: './database/loginUser.php',
        data: { user: value },
        success: (rel) => {
          console.log(rel);
          if (rel.success) {
            Swal.fire({
              icon: 'success',
              title: 'successfull login',
              text: 'Redirecting...',
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
            }).then(() => {
              // after login success,
              var user = { id: rel.id, name: rel.name };
              // save user in local storage and it will last for 24h
              setLocalStorageWithExpriry('user', user, 24);
              location.reload();
            });
          }
          if (rel.error) {
            Swal.fire({
              icon: 'error',
              title: rel.error,
            });
          }
        },
      });
    },
  });
}

export function registerUser() {
  //signup form validation
  Validator({
    form: '#signup-form',
    errorSelector: '.form-message',
    formGroupSelector: '.form-group',
    rules: [
      Validator.isRequired('#signup-name'),
      Validator.minLength('#signup-name', 6, 'Username need to be at least 6 characters long'),

      Validator.isRequired('#signup-password'),
      Validator.upperCaseLetter('#signup-password'),
      Validator.lowerCaseLetter('#signup-password'),
      Validator.specialCharacter('#signup-password'),
      Validator.minNumberPass('#signup-password'),
      Validator.hasWhiteSpace('#signup-password'),
      Validator.minLength('#signup-password', '6', 'Password need to be at least 6 characters long'),

      Validator.isRequired('#signup-password-confirmation'),
      Validator.isConfirmed(
        '#signup-password-confirmation',
        function () {
          return document.querySelector('#signup-form #signup-password').value;
        },
        'Passwords do NOT match!',
      ),
    ],
    onSubmit: function (value) {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: './database/registerUsers.php',
        data: { user: value },
        success: (rel) => {
          if (rel == true) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'username already in use!',
            });
          } else {
            console.log(rel);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: rel.message,
            });
            $('#signup-form input').val('');
          }
        },
      });
    },
  });
}

//this function is using for store info to local storage with expiry
export function setLocalStorageWithExpriry(key, value, hours) {
  const ttl = hours * 3600 * 1000;
  //get date now
  const now = new Date();

  // make object en store value en time in
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  //save item in local storage
  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorageWithExpiry(key) {
  // get item from local storage
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  //convert json type to javascript type
  const item = JSON.parse(itemStr);
  const now = new Date();
  // compare the current time with the item time
  if (now.getTime() > item.expiry) {
    // remove item in local storage en return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}
