$(document).ready(() => {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://api.coincap.io/v2/exchanges',
    success: (res) => {
      //get Template
      const templateExhageInfo = $('#js-exchange-info').html();
      //Render output with Mustache
      var renderExchangeContent = Mustache.render(templateExhageInfo, res);
      $('#js-exchanage-coin-content').html(renderExchangeContent);
    },
  });
});
