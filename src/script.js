function formatDate(timestamp){
let date = new Date(timestamp);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
return `${day}, ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
  }
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
function displayTemperature(response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");
let minTempElement = document.querySelector("#min-temp");
let maxTempElement = document.querySelector("#max-temp");
let minForecastElement = document.querySelector("#min-forecast-temperature");
let maxForecastElement = document.querySelector("#max-forecast-temperature");

celsiusTemperature = response.data.main.temp;
minCelsiusTemperature = response.data.main.temp_min
maxCelsiusTemperature = response.data.main.temp_max
minCelsiusForecast = forecast.main.temp_min
maxCelsiusForecast = forecast.main.temp_max

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
minTempElement.innerHTML = Math.round(minCelsiusTemperature);
maxTempElement.innerHTML = Math.round(maxCelsiusTemperature); 
minForecastElement.innerHtml = Math.round(minCelsiusForecast);
maxForecastElement.innerHTML = Math.round(maxCelsiusForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  
  for (let index = 0; index < 3; index++) {
    forecast = response.data.list[index];
    
  forecastElement.innerHTML += `
  <div class="col-4">
    <h5 id="hour-forecast">
    ${formatHours(forecast.dt * 1000)}
    </h5>
    <img 
    src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" width="75 px"/>
    <div class="weather-forecast-temperature">
        <span id="min-forecast-temperature">${Math.round(forecast.main.temp_min)}</span>° | <span id="max-forecast-temperature">${Math.round(forecast.main.temp_max)}</span>°
    </div>
</div>`;
}
}

function search(city){
let apiKey = "76c8b94d63a7e1828617006132974e2d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}
function displayFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  let minTemperatureElement = document.querySelector("#min-temp");
  let minFahrenheitTemperature = (minCelsiusTemperature * 9) / 5 + 32;
  minTemperatureElement.innerHTML = Math.round(minFahrenheitTemperature);
  let maxTemperatureElement = document.querySelector("#max-temp");
  let maxFahrenheitTemperature = (maxCelsiusTemperature * 9) / 5 + 32;
  maxTemperatureElement.innerHTML = Math.round(maxFahrenheitTemperature);
  let minForecastElement = document.querySelector("#min-forecast-temperature");
  let minFahrenheitForecast = (minCelsiusForecast * 9) / 5 + 32;
  minForecastElement.innerHTML = Math.round(minFahrenheitForecast);
  let maxForecastElement = document.querySelector("#max-forecast-temperature");
  let maxFahrenheitForecast = (maxCelsiusForecast * 9) / 5 + 32;
  maxForecastElement.innerHTML = Math.round(maxFahrenheitForecast);
}

function displayCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let minTemperatureElement = document.querySelector("#min-temp");
  minTemperatureElement.innerHTML = Math.round(minCelsiusTemperature);
  let maxTemperatureElement = document.querySelector("#max-temp");
  maxTemperatureElement.innerHTML = Math.round(maxCelsiusTemperature);
  let minForecastElement = document.querySelector("#min-forecast-temperature");
  minForecastElement.innerHTML = Math.round(minCelsiusForecast);
  let maxForecastElement = document.querySelector("#max-forecast-temperature");
  maxForecastElement.innerHTML = Math.round(maxCelsiusForecast);
}

let celsiusTemperature = null;
let minCelsiusTemperature = null;
let maxCelsiusTemperature = null;
let minCelsiusForecast = null;
let maxCelsiusForecast = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

 search("London");