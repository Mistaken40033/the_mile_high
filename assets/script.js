document.addEventListener("DOMContentLoaded", () => {
  const APIKey = "YOUR_API_KEY"; // Replace with your actual OpenWeatherMap API key
  const cityForm = document.getElementById("cityForm");
  const weatherInfo = document.getElementById("weatherInfo");

  cityForm.addEventListener("submit", event => {
      event.preventDefault();
      const cityInput = document.getElementById("cityInput").value.trim();
      if (cityInput === "") return;

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${APIKey}&units=metric`;

      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              displayWeather(data);
          })
          .catch(error => {
              weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
          });
  });

  function displayWeather(data) {
      const temperature = data.main.temp;
      const description = data.weather[0].description;

      // Update weatherInfo div with the fetched data
      weatherInfo.innerHTML = `
          <h2>Weather in ${data.name}</h2>
          <p>Temperature: ${temperature}°C</p>
          <p>Description: ${description}</p>
      `;
  }
});
