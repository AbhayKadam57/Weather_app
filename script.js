const input = document.querySelector("input");

const temp = document.querySelector(".temp");

const city = document.querySelector(".city");

const wind = document.querySelector("#wind");

const humidity = document.querySelector("#humidity");

const Precipitation = document.querySelector("#preci");

const desc = document.querySelector("#desc");

const img = document.querySelector("img");

const wrapper = document.querySelector("#wrapper");

const Error = document.querySelector(".error");

const getWeather = (CityName) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&appid=${YOUR_API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.cod === 200) {
        return res;
      } else if (res.cod > 200) {
        return "Please enter correct city name...";
      }
    });
};

input.addEventListener("keyup", async (e) => {
  document.querySelector(".errorBox")?.remove();
  if (e.key === "Enter") {
    let CityName = e.target.value.toLowerCase();

    try {
      let weather = await getWeather(CityName);

      city.innerText = weather.name;
      temp.innerHTML = `${weather.main.temp.toFixed(1)}<span>&deg;C</span>`;

      wind.innerText = `${weather.wind.speed} m/s`;

      humidity.innerText = `${weather.main.humidity}%`;

      Precipitation.innerText = weather.rain ? `${weather.rain[0]}%` : `0%`;

      desc.innerText = weather.weather[0].description;

      img.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      );

      e.target.value = "";
    } catch (err) {
      let error = document.createElement("div");

      error.setAttribute("class", "errorBox");

      error.innerHTML = `<small class='error'>${err}</small>`;

      !document.querySelector(".error") && wrapper.append(error);

      console.log(wrapper.lastElementChild);
    }
  }
});
