var apKey = '5a62f4bb8b9b5dc5803e1dc31e408686'
var city = ''
var qUrl = ''
var qUrl2 = ''
var counter = 0;
var maxCities = 5;

let forecastData, cardIndex, i,
 dateString, date, options,
  frmtDate, weather, icon, temp,
   wind, humidity;


   $('#Btn').click(function() {
    city = $('#cityInpt').val();
    getCurWeather(city)
    console.log(city)
   });






// ********** TIME HEADER **********
setInterval(function() {
    $('#curTmDt').text(dayjs().format(' MMMM D, YYYY h:mm A '));
}, 1000);
// ********** TIME HEADER **********



// TODO when search button is clicked, point viewport to current weather
// ********** SEARCH & SAVE BUTTON **********
function getCurWeather() {
  currentDate = dayjs().format('MMMM D, YYYY');
  qUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apKey + '&units=imperial';    

  fetch(qUrl)
    .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {
      //saves the city in local storage, with a unique key
      var key = 'city_' + counter++;
      localStorage.setItem(key, data.name);
      // ******************************************
      $('#ctyDte').text('CITY: ' + ' ' + data.name + ' ' + currentDate) ;
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
    // ******* Starting Point For The Second API call ******    
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var qUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apKey}&units=imperial`;

      fetch(qUrl2)
        .then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(forecastData => {
      
          for (var cardIndex = 1; cardIndex <= 5; cardIndex++) {
            var i = (cardIndex - 1) * 8;
            var dateString = forecastData.list[i].dt_txt; // assuming i is the index of the current forecast item
            var date = new Date(dateString);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var frmtDate = date.toLocaleDateString('en-US', options);
            var weather = forecastData.list[i].weather[0].description;
            var icon = forecastData.list[i].weather[0].icon;
            var temp = forecastData.list[i].main.temp; 
            var wind = forecastData.list[i].wind.speed;
            var humidity = forecastData.list[i].main.humidity; 

            // console.log(date)
            // console.log(weather)
            // console.log(icon)
            // console.log(temp)
            // console.log(wind)
            // console.log(humidity)

            $(`#card${cardIndex} .card-date`).html(frmtDate);
            $(`#card${cardIndex} .feelsLike`).text(weather);
            $(`#card${cardIndex} .card-img`).attr('src', `https://openweathermap.org/img/w/${icon}.png`);
            $(`#card${cardIndex} .card-temp`).text(Math.round(temp) + '°F' );
            $(`#card${cardIndex} .card-wind`).text('Wind: ' + Math.round(wind) + ' MPH')
            $(`#card${cardIndex} .card-humidity`).text('Humidity: ' + humidity + '%')

            //$(`#card${cardIndex} .card-img`).attr("src", getWeatherIconURL(weather));

            // console.log("Date: " + date + " Weather: " + weather);
          }

          // every 24 hours interval in utc is in 8 object increments
          // - for loop to itterate through every 8 objects?
          // console.log(forecastData)
        })
        .catch(error => {
          console.error('Error fetching forecast data:', error);
        });
      
      // qUrl2 = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
      
      // **** API TEST ****
       console.log(data);
       
      // **** API TEST ****
    })
    .catch(error => {
      console.error('There was a problem with the network request:', error);
      alert('There was a problem retrieving the weather data. Please try again later.');
    });
};

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
    var city = localStorage.getItem(key);
    if (!isCityAlreadyStored(city)) {
      localStorage.removeItem(keys[i]);
    } else {
    var button = $('<button>').attr('type', 'button')
                               .addClass('btn btn-success border border-danger border-5 m-3')
                               .text(city)
                               .attr('data-city', city)
                               .attr('id', 'aBTN' )
    $('#ctyHist').append(button);
  }
    console.log(index)
  });
});

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

// TODO Make a click function that will show the current weather for the selected city button
// ****** CODE FOR THE SAVED CITIES BUTTONS *******

  
$('#ctyHist').on('click', 'button', function() {
  var city = $(this).text();

  currentDate = dayjs().format('MMMM D, YYYY');
  qUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apKey + '&units=imperial';    

  fetch(qUrl)
    .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(data => {

      $('#ctyDte').text('CITY: ' + ' ' + data.name + ' ' + currentDate) ;
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

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var qUrl2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apKey}&units=imperial`;

      fetch(qUrl2)
        .then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Network response was not ok');
        })
        .then(forecastData => {
      
          for (var cardIndex = 1; cardIndex <= 5; cardIndex++) {
            var i = (cardIndex - 1) * 8;
            var dateString = forecastData.list[i].dt_txt;
            var date = new Date(dateString);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var frmtDate = date.toLocaleDateString('en-US', options);
            var weather = forecastData.list[i].weather[0].description;
            var icon = forecastData.list[i].weather[0].icon;
            var temp = forecastData.list[i].main.temp; 
            var wind = forecastData.list[i].wind.speed;
            var humidity = forecastData.list[i].main.humidity; 

            $(`#card${cardIndex} .card-date`).html(frmtDate);
            $(`#card${cardIndex} .feelsLike`).text(weather);
            $(`#card${cardIndex} .card-img`).attr('src', `https://openweathermap.org/img/w/${icon}.png`);
            $(`#card${cardIndex} .card-temp`).text(Math.round(temp) + '°F' );
            $(`#card${cardIndex} .card-wind`).text('Wind: ' + Math.round(wind) + ' MPH')
            $(`#card${cardIndex} .card-humidity`).text('Humidity: ' + humidity + '%')


          };

});

})

})
