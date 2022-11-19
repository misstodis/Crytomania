$(document).ready(() => {
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: 'https://newsdata.io/api/1/news?apikey=pub_131901059f04bb634948249269ea0b741494a&q=Crypto&language=en',
    success: (res) => {
      // some news don't have image , get new random image throught the API and store it in data
      $.each(res.results, function (key, value) {
        var randomNumber = Math.random(100);
        if (!value.image_url) {
          value.image_url = `https://source.unsplash.com/random/?Cryptocurrency&${randomNumber}`;
        }
        value.pubDate = moment(value.pubDate).format('DD-MMMM-YYYY');
      });

      const threeFirstNew = { data: res.results.slice(0, 3) };
      //set active first element in array (this using for slider bootrap)
      threeFirstNew.data[0].isActive = 'active';
      //get Template
      const templateSliderNews = $('#js-three-news-slide-info').html();
      //Render output with Mustache
      var renderesiderNews = Mustache.render(templateSliderNews, threeFirstNew);
      $('#js-three-news-slide-content').html(renderesiderNews);

      console.log(res);

      const templateNewsInfo = $('#js-news-info').html();
      //Render output with Mustache
      var renderNews = Mustache.render(templateNewsInfo, res);
      $('#js-news-content').html(renderNews);
    },
  });
});
