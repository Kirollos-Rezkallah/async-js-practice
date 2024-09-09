const label = document.querySelector("label");
const input = document.querySelector("input");
const button = document.querySelector("button");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");

button.addEventListener("click", () => {
  event.preventDefault();
  verifyNum().catch((e) => {
    console.log(e);
  });
});

function verifyNum() {
  let value = input.value.trim();
  if (value === "") {
    h2.innerText = "Please enter a valid phone number!";
    h2.style.color = "red";
    return;
  }
  let url = `http://apilayer.net/api/validate?access_key=302fa3ba185e56f2bc309f0e73e51ba5&number=${value}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error in the request!");
      }
      return response.json();
    })
    .then((data) => {
      h2.innerText = data.valid;
      h2.style.color = "#00a9c6";
      h3.innerText = data.country_name;
    })
    .catch((e) => {
      console.error("Error in fetching data!");
      h2.innerText = "Not a valid phone number";
      h2.style.color = "red";
      h3.innerText = "";
      throw e;
    });
}
