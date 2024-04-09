// Define the API key
const apiKey = "1d68e8493b0c9a0ba5c278608f652b14";

// Function to fetch the forecast data using city name
const fetchForecastByCity = async (cityName) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }
    const data = await response.json();
    // Save the searched city name to localStorage
    saveCityNameToLocalStorage(cityName);
    return data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }
};

// Function to display forecast data
const displayForecast = (forecastData) => {
  const forecastDiv = document.getElementById("fiveDayForecast");
  forecastDiv.innerHTML = ""; // Clear previous forecast data

  if (forecastData) {
    const forecastHeader = document.createElement("h5");
    forecastHeader.className = 'card-header border-secondary';
    forecastHeader.textContent = '5 Day Forecast';
    forecastDiv.appendChild(forecastHeader);
    const cardDeck = document.createElement("div");
    cardDeck.className = 'card-deck';
    forecastDiv.appendChild(cardDeck);

    // Process forecast data and append to DOM
    forecastData.list.forEach(item => {
      const card = document.createElement("div");
      card.className = 'card';

      // Create card body
      const cardBody = document.createElement("div");
      cardBody.className = 'card-body';

      // Add weather icon
      const weatherIcon = document.createElement("img");
      weatherIcon.className = 'weather-icon';
      weatherIcon.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
      cardBody.appendChild(weatherIcon);

      // Add temperature
      const temperatureText = document.createElement("p");
      const temperature = Math.round(item.main.temp - 273.15); // Convert temperature from Kelvin to Celsius
      temperatureText.textContent = `Temperature: ${temperature}°C`;
      cardBody.appendChild(temperatureText);

      // Add weather description
      const weatherDescription = document.createElement("p");
      weatherDescription.textContent = item.weather[0].description;
      cardBody.appendChild(weatherDescription);

      // Append card body to card
      card.appendChild(cardBody);

      // Append card to card deck
      cardDeck.appendChild(card);
    });
  } else {
    forecastDiv.textContent = "Forecast data not available.";
  }
};

// Event listener for the search button
document.getElementById("searchButton").addEventListener("click", async () => {
  const cityName = document.getElementById("cityInput").value.trim();
  if (cityName) {
    const forecastData = await fetchForecastByCity(cityName);
    displayForecast(forecastData);
  }
});

// Function to display searched city names from local storage
const displayCityNamesFromLocalStorage = () => {
  const cityNames = getCityNamesFromLocalStorage();
  const cityListElement = document.getElementById("cityList");
  cityListElement.innerHTML = ""; // Clear previous city list
  cityNames.forEach(cityName => {
    const listItem = document.createElement("li");
    listItem.textContent = cityName;
    cityListElement.appendChild(listItem);
  });
};

// Function to save searched city name to local storage
const saveCityNameToLocalStorage = (cityName) => {
  let cityNames = getCityNamesFromLocalStorage();
  if (!cityNames.includes(cityName)) {
    cityNames.push(cityName);
    localStorage.setItem('cityNames', JSON.stringify(cityNames));
  }
};

// Function to get searched city names from local storage
const getCityNamesFromLocalStorage = () => {
  const storedCityNames = localStorage.getItem('cityNames');
  return storedCityNames ? JSON.parse(storedCityNames) : [];
};

// Display searched city names from local storage when the page loads
window.onload = () => {
  displayCityNamesFromLocalStorage();
};
