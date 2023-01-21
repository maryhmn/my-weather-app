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

document.querySelector("#search-form").addEventListener("submit", handleSubmit);
search("Tehran");
