var apKey = '5a62f4bb8b9b5dc5803e1dc31e408686'
var city = ''
var qUrl = ''
var counter = 0;
var maxCities = 5;

// ********** TIME HEADER **********
setInterval(function() {
    $('#curTmDt').text(dayjs().format(' MMMM D, YYYY h:mm A '));
}, 1000);
// ********** TIME HEADER **********

// ********** SEARCH & SAVE BUTTON **********
$('#Btn').click(function() {
  currentDate = dayjs().format('MMMM D, YYYY');
  city = $('#cityInpt').val();
  qUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apKey + '&units=imperial';    

  fetch(qUrl)
    .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
      //saves the city in local, with a unique key
      var key = 'city_' + counter++;

      localStorage.setItem(key, data.name);
      // ******************************************
      $('#ctyDte').text('CITY: ' + '' + data.name);
      $('#temp').text(data.main.temp + ' °F');
      $('#wicon').attr('src', 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png');
      $('#desc').text(data.weather[0].description + ' Feels like: ' + data.main.feels_like)
      $('#wind').text(data.wind.speed + ' MPH');
      $('#humidity').text(data.main.humidity + '%');
      //*** shows weather card info ***
      $('#currentTCard').show();
      $('#fiveDaFor').show();
      $('#cityText').show();
      $('#curWeatherBx').show();
      $('#cityBox').show();
      //*** shows weather card info ***

      
      // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
      
      // **** API TEST ****
      console.log(data);
      // **** API TEST ****
    })
    .catch(error => {
      console.error('There was a problem with the network request:', error);
      alert('There was a problem retrieving the weather data. Please try again later.');
    });
});

 // Gets all the keys in local storage and sorts them by their var = counter value
$(document).ready(function() {
  var keys = Object.keys(localStorage);
  keys.sort(function(a, b) {
      return a.split('_')[1] - b.split('_')[1];
    });
  // Gets all the keys in local storage and sorts them by their var = counter value 
    
  
    if (keys.length > maxCities) {
        var numToRemove = keys.length - maxCities;
            for(var i = 0; i < numToRemove; i++) {
                localStorage.removeItem(keys[i]);
        }
    }


  // Loops through the stored keys and create a button for each city
  $.each(keys, function(index, key) {
    var city = localStorage.getItem(key)
    var button = $('<button>').attr('type', 'button')
                               .addClass('btn btn-success border border-danger border-5 m-3')
                               .text(city)
                               .attr('data-city', city)
                               .attr('id', 'aBTN' )
    $('#ctyHist').append(button);
  });
});

/*
$(document).ready(function() {
  var data = localStorage.getItem(data.name)
  if (data) {
    var parsedData = JSON.parse(data)

    console.log(parsedData)
  }

})

*/

function isCityAlreadyStored(cityName) {
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (localStorage.getItem(key) === cityName) {
      return true;
    }
  }
  return false;
}



$('#clearBtn').click(function() {
  localStorage.clear();
  location.reload();
});