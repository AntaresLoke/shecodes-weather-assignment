//---------- date / time ------------------------
function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = [
    "Janaury",
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
    "Decemeber",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hour = ("0" + now.getHours()).slice(-2);
  let minutes = ("0" + now.getMinutes()).slice(-2);
  let seconds = ("0" + now.getSeconds()).slice(-2);

  return `${day} ${date} ${month} ${year} ${hour}:${minutes}:${seconds}`;
}

let dateAndTime = document.querySelector("#dateAndTime");
let currentTime = new Date();
dateAndTime.innerHTML = formatDate(currentTime);

//--------- celsius / Fahrenheit ----------------
function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 30;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 86;
}

let clickCelsius = document.querySelector("#celsius-link");
clickCelsius.addEventListener("click", convertToCelsius);

let clickFahrenheit = document.querySelector("#fahrenheit-link");
clickFahrenheit.addEventListener("click", convertToFahrenheit);

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
  let city = document.querySelector("#city-input").value;
  searchCity(city);
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
  document.querySelector(
    "#place"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Hunidity: ${response.data.main.humidity} %`;
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  //let searchIcon = response.data.weather[0].icon;
}

let searchform = document.querySelector("#search-form");
searchform.addEventListener("submit", handleSubmit);

searchCity("ipoh");
