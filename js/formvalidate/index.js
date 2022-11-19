// constructor funtion (đối tượng Validator)
export function Validator(options) {
  // tạo 1 function để lấy ra parent element có class là form-group của 1 input
  // đây là trong trường hợp nếu thẻ input nằm trong thẻ khác bên trong thẻ cha có class là 'form-group'
  // vd : <div class='form-group'> <div> <div> <input /> </div> </div> </div>.
  function getParent(element, selector) {
    //sử dụng vòng lặp while để lặp
    while (element.parentElement) {
      //kiểm tra nếu như 1 thẻ parentElement
      // có class là '.form-group' thì nó sẽ return ra thẻ đó
      // nếu ko thì gán cha vừa tìm đc làm thẻ con và tiếp tục vòng lăp để kiểm tra
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  // tạo ra 1 object để lưu nhiều rule cho 1 input
  const selectorRules = {};

  //lấy ra thẻ form
  var formElement = document.querySelector(options.form);

  if (formElement) {
    //lắng nghe sự kiện khi submit form, khi ấn button submit
    formElement.onsubmit = (e) => {
      // bỏ đi hành vi mặc định của form khi submit
      e.preventDefault();

      var isFormValid = true;

      // lặp qua từng rule và validate , kiểm tra input
      options.rules.forEach(function (rule) {
        //tìm kiếm thẻ input chỉ có trong thẻ formElement
        var inputElement = formElement.querySelector(rule.selector);
        // gọi hàm và  truyền vào function validate cái inputElement, rule
        //lúc này function validate sẽ return về false nếu có lỗi
        var isValid = validate(inputElement, rule);

        // kiểm tra nếu có lỗi thì đổi isFormValid sang false
        if (!isValid) {
          isFormValid = false;
        }
      });

      // xử lý lấy ra dữ liệu của input-------
      //nếu ko có lỗi
      if (isFormValid) {
        // ở bên index.html phần <script> chúng ta có tạo
        // và truyền cho function Validator 1 object với element onSubmit là 1 function (callback)
        // trong trường hợp submit với javascript , nếu có element onSubmit trong object
        // lấy ra element đó và kiểm tra xem nó có phải 1 function hay ko
        if (typeof options.onSubmit === 'function') {
          //lấy ra các thẻ input
          //trong thẻ form lấy ra tất cả các thẻ có field là name và ko có field là disable
          // lúc này nó sẽ trả về 1 Nodelist
          var inputs = formElement.querySelectorAll('[name]:not([disable])');

          // sau đó convert từ Nodelist sang array = Array.from(inputs)
          // để đưa từng input vào array
          // và sau đó sử dụng reduce của array , để lưu value của input vào 1 object
          // bản thân reduce cũng là 1 vòng lặp
          var formValues = Array.from(inputs).reduce(function (inittialValues, input) {
            // inittialValues là biến khởi tạo của reduce, mà bên dưới chúng ta gán cho nó là 1 object
            // nên lúc này chúng ta gán cho object cái key và value

            //kiểm tra xem input có phải radio hoặc checkbox hay ko ?
            switch (input.type) {
              case 'radio':
                // nếu là radio đã checked thì lấy value gán vào
                if (input.matches(':checked')) {
                  inittialValues[input.name] = input.value;
                }
                break;
              // nếu nó là checkbox và nó có nhiều ô đc check và sẽ có nhiều value
              case 'checkbox':
                // thì kiểm tra xem ô nào đã dc check
                if (!input.matches(':checked')) {
                  // kiểm tra xem giá trị của inittialValues[input.name] đã là 1 array hay chưa
                  if (!Array.isArray(inittialValues[input.name])) {
                    // nếu chưa đc ô nào dc check thì nó sẽ trả về 1 chuỗi rỗng
                    // và nó chưa là 1 array ( nghĩa là chưa có giá trị trong array đó)
                    inittialValues[input.name] = '';
                  }
                  // trả về giá trị của biến khởi tạo
                  return inittialValues;
                }
                // nếu ô đã dc checked
                // kiểm tra xem có phải 1 array hay ko
                if (!Array.isArray(inittialValues[input.name])) {
                  // gán cho nó là 1 array
                  inittialValues[input.name] = [];
                }
                //sau khi gán cho nó là 1 array
                //  thì thêm value vào trong array đó
                inittialValues[input.name].push(input.value);
                break;

              // nếu input type = file
              case 'file':
                inittialValues[input.name] = input.files;
                break;
              default:
                // còn input còn lại thì gán như bình thường
                inittialValues[input.name] = input.value;
                break;
            }

            //return về sau khi đã gán xong
            return inittialValues;
          }, {});

          // console.log(formValues);

          //và truyền params cho options.onSubmit() , callback function
          // lúc này bên index.html sẽ nhận đc object với đầy đủ value của input
          options.onSubmit(formValues);
        } else {
          // trong trường hợp submit với hành vi măc đinh html, nếu ko có element onSubmit trong object
          formElement.submit();
        }
      }
    };

    // vì rules là 1 array
    // lặp element rules của object options = bằng forEach
    // và xử lý (lắng nghe sự kiện blur, input ,...)
    options.rules.forEach(function (rule) {
      //console.log(rule)

      // lưu lại các rules cho mỗi input để input có thể có nhiều rules hơn
      // 1.lượt chạy đầu tiên nó sẽ nó sẽ lọt vào else
      //  lưu rule.test vào 1 array rồi lưu vào trong object selectorRules với key rule.selector
      // 2. sau đó nó sẽ lọt vào if bởi vì lúc này trong object selectorRules có element là ( key :[array] ) lúc này nó sẽ là 1 array
      // lúc này nó sẽ thêm 1 rule mới vào trong array với phương thức push của array
      // hãy console.log( selectorRules) ra để xem
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      // tìm kiếm thẻ input chỉ có trong thẻ formElement
      // sử dụng querySelectorAll để lấy ra tất cả input bởi vì nếu mình có sử dụng radio hoặc checkbox
      // và mình lấy ra thẻ input radio và checkbox bằng kiểu: input[name="gender"] (số nhiều)
      // nên nếu sử dụng querrySelector thì nó sẽ chỉ lấy ra input đầu tiên của input radio,
      // còn với các input khác thì mình lấy dự trên id (ko có input trùng id) và ko sử dụng radio hoặc checkbox nên có thể sử dụng querySelector() cũng đc
      // querySelectorAll nó sẽ trả về 1 Nodelist
      var inputElements = formElement.querySelectorAll(rule.selector);

      // convert nodeList sang array và lặp để lấy ra input
      Array.from(inputElements).forEach(function (inputElement) {
        // console.log(inputElement);

        if (inputElement) {
          //xử lý trường hợp blur ra khỏi input
          inputElement.onblur = function () {
            // gọi hàm và  truyền vào function validate cái inputElement, rule
            validate(inputElement, rule);
          };

          //xử lý trg hợp khi nhập thông tin vào input
          inputElement.oninput = function () {
            const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(
              options.errorSelector,
            );
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
          };
        }
      });
    });
  }

  //tạo ra function thực hiện validate
  const validate = (inputElement, rule) => {
    // bởi vì các ô input đều sử dụng chung một span với class form-message,
    // nên khi in ra error message sẽ ko biết của ô input nào nên bằng cách
    // từ input -> lấy ra parentElement(bởi vì parrentElemnt ôm cả thẻ input và thẻ error message)
    // của nó rồi trỏ đến class .form-message thì sẽ biết đc .form-message sẽ là của ô input nào
    const errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

    //truyền input value vào trong funtion test để kiểm tra, nó sẽ return về lỗi
    var errorMessage;

    // sau khi lưu các rules vào bên trong object selectorRules ,
    // thì lúc này chúng ta sẽ lấy ra các rule của input dựa trên key của object selectorRules = rule.selector
    // rules lúc này sẽ là 1 mảng với 2 function
    const rules = selectorRules[rule.selector];
    // console.log(rules);

    //lặp qua rules (array) bằng vòng lặp for
    // để lấy ra từng rule nếu có nhiều  rule cho 1 input
    for (var i = 0; i < rules.length; i++) {
      // kiểm tra xem input có phải checkbox hoặc radio hay ko ?
      switch (inputElement.type) {
        // nếu là radio hoặc checkbox
        case 'radio':
        case 'checkbox':
          console.log(formElement.querySelector(rule.selector + ':checked'));
          // nó sẽ gửi vào function kiểm tra 2 param là thẻ input radio đó đã checked và type của input
          errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'), inputElement.type);
          break;
        default:
          // rules[i] là 1 function lấy ra function đầu tiên trong array,
          // lấy ra function đc lưu trong array đó và truyền vào param cho nó
          errorMessage = rules[i](inputElement.value);
      }

      //nếu có lỗi thì thoát ra khỏi vòng lặp
      if (errorMessage) break;
    }

    // nếu có lỗi
    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, options.formGroupSelector).classList.add('invalid');
    } else {
      errorElement.innerText = '';
      getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
    }

    // console.log(selectorRules[rule.selector]);

    // nếu có errorMessage thì return false , nếu ko có thì sẽ là true
    return !errorMessage;
  };
}

// định nghĩa các rules
// nguyên tắc của các rules :
// 1. khi có lỗi => trả ra mesage lỗi
// 2. khi hợp lệ => ko trả ra gì cả (undefine)
// vì bản thân function cũng là 1 object nên ( Validator.isRequired ) đây mang nghĩa là tạo ra 1 element cho object
Validator.isRequired = function (selector, message) {
  // return về 1 object
  return {
    selector: selector,
    test: function (value, inputType = null) {
      // value trong trường hợp input là checkbox hoặc radio
      //  nó sẽ tả về giá trị null nếu ko chọn gì
      if (inputType == 'radio' || inputType == 'checkbox') {
        return value ? undefined : message || 'Empty field , please fill this in! ';
      } else {
        // còn vs các input type còn lại
        // trim() loại bỏ khoảng trắng trong ô input type=text, vd người dùng chỉ nhập mỗi dấu space thì cũng ko hợp lệ
        // nếu có custom message thì cho vào ko thì default sẽ là chuỗi đằng sau nó
        return value.trim() ? undefined : message || 'Empty field , please fill this in! ';
      }
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      // kiểm tra email bằng regex
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return emailRegex.test(value) ? undefined : message || 'This field need a email!';
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      // kiểm tra email bằng regex
      return value.length >= min ? undefined : message || `This password need at least ${min} characters`;
    },
  };
};

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      // so sánh 2 password
      return value === getConfirmValue() ? undefined : message || 'Input value is incorrect';
    },
  };
};

Validator.minNumberPass = function (selector, message) {
  var numbers = /[0-9]/g;
  return {
    selector: selector,
    test: function (value) {
      return value.match(numbers) ? undefined : message || `This password need at least 1 number`;
    },
  };
};

Validator.upperCaseLetter = function (selector, message) {
  var upperCaseLetters = /[A-Z]/g;
  return {
    selector: selector,
    test: function (value) {
      return value.match(upperCaseLetters) ? undefined : message || `This password need at least 1 uppercase letter`;
    },
  };
};

Validator.lowerCaseLetter = function (selector, message) {
  var lowerCaseLetter = /[a-z]/g;
  return {
    selector: selector,
    test: function (value) {
      return value.match(lowerCaseLetter) ? undefined : message || `This password need at least 1 lowercase letter`;
    },
  };
};

Validator.specialCharacter = function (selector, message) {
  var specialCharacter = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
  return {
    selector: selector,
    test: function (value) {
      return value.match(specialCharacter) ? undefined : message || `This password need at least 1 special character`;
    },
  };
};

Validator.hasWhiteSpace = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.indexOf(' ') <= 0 ? undefined : message || `Please check your fields for spaces`;
    },
  };
};

Validator.hasZeroValue = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value != 0 ? undefined : message || `can't not store 0 in this field`;
    },
  };
};
