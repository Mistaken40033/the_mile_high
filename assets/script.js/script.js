// Assume you have actual latitude and longitude values
const lat = 'latitude';
const lon = 'longitude';
const APIKey = "1d68e8493b0c9a0ba5c278608f652b14";

// Construct the API URL with the correct values
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;

// Fetch data from OpenWeatherMap API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Process the weather data here

    // Example of appending data to the DOM
    const forecastDiv = $("<div id='fiveDayForecast'>");
    const forecastHeader = $("<h5 class='card-header border-secondary'>").text("5 Day Forecast");
    forecastDiv.append(forecastHeader);
    const cardDeck = $("<div class='card-deck'>");
    forecastDiv.append(cardDeck);

    // Example of processing data and appending to DOM
    // Assume 'data' contains weather forecast information
    data.list.forEach(item => {
      const card = $("<div class='card'>");
      const cardBody = $("<div class='card-body'>").text(item.weather[0].description);
      card.append(cardBody);
      cardDeck.append(card);
    });

    // Append forecastDiv to the document body or any other element you want
    $("body").append(forecastDiv);
  })
  .catch(error => console.error('Error fetching data:', error));
