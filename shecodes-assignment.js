//---------- date / time ------------------------
function formatDate(now) {
  let date = new Date(now);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${formatHours(now)}`;
}
  
  function formatHours(now) {
    let date = new Date(now);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);

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

//----------- search current location --------------
function searchCity(city) {
  let apiKey = "c7195f08f55692910c7a8c05de972766";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  axios
    .get(`${apiUrl}&appid=${apiKey}&units=metric`)
    .then(showSearchCityWeatherDetails);
}

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
  axios
    .get(`${apiUrlForShowPosition}&appid=${apiKey}&units=metric`)
    .then(showSearchCityWeatherDetails);
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
