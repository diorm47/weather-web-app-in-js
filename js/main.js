const api = {
  key: "b9bcc654e34a97372c2287bef2b805d5",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};
let searchBox = document.querySelector(".search_box");
searchBox.addEventListener("keypress", setQuery);
function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
  }
}
function getResults(querry) {
  fetch(`${api.baseUrl}weather?q=${querry}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}
function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherElem = document.querySelector(".weather");
  weatherElem.innerHTML = weather.weather[0].main;

  let highLow = document.querySelector(".high_low");
  highLow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
}
function dateBuilder(s) {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
