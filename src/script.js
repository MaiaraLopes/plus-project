function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
  }
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
return `${day}, ${hours}:${minutes}`
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

temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
minTempElement.innerHTML = Math.round(response.data.main.temp_min);
maxTempElement.innerHTML = Math.round(response.data.main.temp_max); 
}

function search(city){
let apiKey = "76c8b94d63a7e1828617006132974e2d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

search("London");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);