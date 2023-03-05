var apKey = '5a62f4bb8b9b5dc5803e1dc31e408686'
var city = ''
var qUrl = ''

// ********** TIME HEADER **********
setInterval(function() {
    $('#curTmDt').text('Today is ' + dayjs().format('MMMM D, YYYY h:mm:s A'));
}, 1000);
// ********** TIME HEADER **********

// ********** SEARCH & SAVE BUTTON **********
$('#Btn').click(function() {
  currentDate = dayjs().format('MMMM D, YYYY');
  city = $('#cityInpt').val();
  qUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apKey + '&units=imperial';    

  $(city).set
  fetch(qUrl)
    .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
      $('#ctyDte').text('CITY: ' + data.name);
      $('#temp').text(data.main.temp + ' °F');
      $('#wicon').attr('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
      $('#desc').text(data.weather[0].description + ' Feels like: ' + data.main.feels_like)
      $('#wind').text(data.wind.speed + ' MPH');
      $('#humidity').text(data.main.humidity + '%');
// can this be saved in local storage and then retrieved?
      var button = $('<button>').attr('type', 'button')
                                 .addClass('btn btn-info border border-warning border-2')
                                 .text(data.name)
                                 .attr('data-city', data.name);
      $('#ctyHist').append(button);
      localStorage.setItem('city', data.name);
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the network request:', error);
      alert('There was a problem retrieving the weather data. Please try again later.');
    });
});