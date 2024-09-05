const button = document.querySelector("button");
const input = document.querySelector("input");
const h3 = document.querySelector("h3");

button.addEventListener("click", () => {
  event.preventDefault();
  getVerse().catch(() => {
    console.log(e);
  });
});

function getVerse() {
  let value = input.value.trim();
  if (value === "") {
    h3.innerText = "Please enter valid verse or passage!";
    h3.style.color = "red";
  }
  let url = `https://bible-api.com/${value}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request!");
      }
      return response.json();
    })
    .then((data) => {
      h3.innerText = data.text;
      h3.style.color = "#0c253e";

      input.value = "";
    })
    .catch((e) => {
      console.error("Problem in fetching data", e);
      h3.innerText = "Please enter valid verse or passage!";
      h3.style.color = "red";
      throw e;
    });
}
