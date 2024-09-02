const input = document.querySelector("input");
const form = document.querySelector("form");
const button = document.querySelector("button");
const temp = document.querySelector("h2");
const icon = document.querySelector("img");

button.addEventListener("click", () => {
  event.preventDefault();
  getWeather().catch((e) => {
    console.log(e);
  });
});

function getWeather() {
  const value = input.value.trim();
  if (value === "") {
    temp.innerText = "Please enter a valid city";
    return;
  }
  const url = `http://api.weatherapi.com/v1/current.json?key=1bde503b3d1049bbad6204605240209&q=${value}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request");
      }
      return response.json();
    })
    .then((data) => {
      temp.innerText = `${value}: ${data.current.temp_c}°C`;
      icon.src = data.current.condition.icon;
      input.value = "";
    })
    .catch((e) => {
      temp.innerText = "Invalid city, please try again!";
      console.error("Error in fetching data");
      throw e;
    });
}
