function formatDate(timestamp) {
  let date = new Date(timestamp);
  let weekDays = [
    "Sunday",
    "Monday",
    "Thusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function getforecast(city) {
  let query = city;
  let apiKey = "0caf272471db66c8o23f540fe4caba4t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}&units=metric`;
  https: axios.get(apiUrl).then(showForecast);
}
function showTempreture(response) {
  document.querySelector("#city-name").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humid").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#currentDate").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute("src", response.data.condition.icon_url);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.icon);
  getforecast(response.data.city);
}
function search(city) {
  let query = city;
  let apiKey = "0caf272471db66c8o23f540fe4caba4t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempreture);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
            <div class="col-2">
              <div class="forcastday">${formatDay(forecastDay.time)}</div>
              <img src="${forecastDay.condition.icon_url}" alt="${
          forecastDay.condition.icon
        }" width="50" />
              <div class="forcast-temperature">
                <span class="forcast-temperature-max">${Math.round(
                  forecastDay.temperature.maximum
                )}</span>??<span
                  class="forcast-temperature-min"
                  >${Math.round(forecastDay.temperature.minimum)}</span
                >??
              </div>
            </div>
          `;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}
document.querySelector("#search-form").addEventListener("submit", handleSubmit);
search("Tehran");
