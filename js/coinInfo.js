import { convertAnyCurrencyFromTo } from './addCoinToWallet.js';

$(document).ready(() => {
  getAllCoins();
});

// get rates of money
function getRates(money) {
  return $.ajax({
    type: 'GET',
    dataType: 'json',
    url: `https://api.coincap.io/v2/rates/${money}`,
  });
}
// function call api to get the list of coins
export function getAllCoins() {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://api.coincap.io/v2/assets',
    success: (rsl) => {
      getRates('euro').then((res) => {
        const coins = rsl.data;
        //make delay after 3 second hidden preloading en show the coins
        setTimeout(() => {
          //loop the object to get list of the coins
          $.each(coins, (index, value) => {
            // check changePercent24Hr en giving color if this go down
            const isCoinUp = value.changePercent24Hr.indexOf('-', 0);
            const priceEuro = Number(value.priceUsd / res.data.rateUsd).toFixed(2);

            value.priceEuro = priceEuro;
            value.priceUsd = Number(value.priceUsd).toFixed(2);
            value.imageUrl = `https://assets.coincap.io/assets/icons/${value.symbol.toLowerCase()}@2x.png`;
            value.changePercent24Hr = isCoinUp
              ? value.changePercent24Hr.slice(0, 4)
              : value.changePercent24Hr.slice(0, 5);
            value.marketCapUsd = Number(value.marketCapUsd / 1000000000).toFixed(2);
            value.isCoinUp = isCoinUp > -1 ? false : true;
          });
          // generate to coins list to template en render to html
          const templateCoinsinfo = $('#js-coins-table-info').html();
          var renderCoinsInfo = Mustache.render(templateCoinsinfo, rsl);
          $('#js-coins-content').html(renderCoinsInfo);

          $('#pre-loading').attr('hidden', true);

          //convert to data table format
          $('#coins-table').DataTable({
            bInfo: false,
          });
          // set pagination at start
          $('.dataTables_paginate ').parents('div').removeClass('col-md-7');
        }, 2000);
      });
    },
  });
}

// function get coins information
export function getCoinInformation(coinId) {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://api.coincap.io/v2/assets/' + coinId,
    success: (rel) => {
      const coinInfo = rel.data;

      //adding new element to the object
      coinInfo.symbolLowerCase = coinInfo.symbol.toLowerCase();
      coinInfo.marketCapSmall = Number(coinInfo.marketCapUsd).toFixed(2);
      coinInfo.volumeSmall = Number(coinInfo.volumeUsd24Hr).toFixed(2);
      coinInfo.supplySmall = Number(coinInfo.supply).toFixed(2);

      //get Template
      const templateChartModal = $('#js-info-coin').html();
      //Render output with Mustache
      var renderChartModal = Mustache.render(templateChartModal, coinInfo);
      //Add the data to you template in HTML
      $('#coinInfo-js').html(renderChartModal);
    },
  });
}

// function get coin info last 7 day
export function getChartInfo(coinName) {
  // create a new date
  const date = new Date();
  // get date today in miliseconds
  var TimeToday = date.getTime();
  // get date 7 day ago in miliseconds
  var TimeWeekAgo = date.setDate(date.getDate() - 7);

  // make an array to store date and price of the coins
  const chartDate = [];
  const chartPrice = [];

  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: `https://api.coincap.io/v2/assets/${coinName}/history?interval=d1&start=${TimeWeekAgo}&end=${TimeToday}`,
    success: (rels) => {
      //loop and push the date and price to array
      $.each(rels.data, (index, value) => {
        //this using library momentJS to convert the date
        const dateConvert = moment(value.date).format('DD-MM-YYYY');
        chartDate.push(dateConvert);
        chartPrice.push(value.priceUsd);
      });
      console.log(rels);
      chartGeneration(chartDate, chartPrice);
    },
  });
}

var myChart;
export function chartGeneration(chartDate, chartPrice) {
  // get html element where u store the chart
  const ctx = document.getElementById('coin-history-chart').getContext('2d');

  //generate chart data
  const data = {
    labels: chartDate,
    datasets: [
      {
        type: 'line',
        label: 'Price',
        borderColor: 'rgb(24, 198, 131)',
        data: chartPrice,
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Date',
            align: 'center',
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Price',
          },
        },
      },
      elements: { point: { radius: 3 } },
    },
  };
  //check if ther already have a chart , then delete it
  if (myChart != undefined) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, config);
}
