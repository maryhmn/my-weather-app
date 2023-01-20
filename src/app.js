function showTempreture(response) {
  console.log(response.data);
  console.log(response.data.city);
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
}
let query = "Lisbon";
let apiKey = "0caf272471db66c8o23f540fe4caba4t";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTempreture);
