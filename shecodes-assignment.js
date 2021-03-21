//---------- date / time ------------------------
function formatDate(now) {
  let dates = new Date(now);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[dates.getDay()];
  let date = dates.getDate();
  let month = months[dates.getMonth()];
  return `${day}, ${date} ${month} ${formatHours(now)}`;
}
  
  function formatHours(now) {
    let dates = new Date(now);
    let hours = ("0" + dates.getHours()).slice(-2);
    let minutes = ("0" + dates.getMinutes()).slice(-2);

    return `${hours}:${minutes}`;
  }

//--------- celsius / Fahrenheit ----------------
function convertToFahrenheit(event) {
  event.preventDefault();
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement  = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let clickFahrenheit = document.querySelector("#fahrenheit-link");
clickFahrenheit.addEventListener("click", convertToFahrenheit);

let clickCelsius = document.querySelector("#celsius-link");
clickCelsius.addEventListener("click", convertToCelsius);

//--------- Forecast ------------------------------
function forecastThressHours(response) {
  let forecastElement = document.querySelector("#forecast-weather");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(response.data.list);

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
      <div class="card">
        <h3 class="card-title">${formatHours(forecast.dt * 1000)}</h3>
        <h5 class="card-text">Max: ${Math.round(forecast.main.temp_max)}°</h5> 
        <h5 class="card-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Min: ${Math.round(forecast.main.temp_min)}°</h5>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
        <h5 class="card-title">${forecast.weather[0].description}</h5>
      </div>`;
  }
}

//----------- Main ---------------------------------
function searchCity(city) {
  let apiKey = "c7195f08f55692910c7a8c05de972766";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showSearchCityWeatherDetails);
  
  apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecastThressHours);
}

//----------- search current location --------------

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c7195f08f55692910c7a8c05de972766";
  let apiUrlForShowPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
  axios.get(`${apiUrlForShowPosition}&appid=${apiKey}&units=metric`).then(showSearchCityWeatherDetails);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

//------------ weather details ---------------------
function showSearchCityWeatherDetails(response) {
  console.log(response.data);
  document.querySelector("#place").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#dateAndTime").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#weatherDescription").innerHTML = response.data.weather[0].description;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  document.querySelector("#icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

searchCity("ipoh");
