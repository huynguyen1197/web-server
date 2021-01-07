console.log("Hello from the other side!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#messageOne");
const messsageTwo = document.querySelector("#messageTwo");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messsageTwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + search.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          return;
        }
        messageOne.textContent = data.location;
        messsageTwo.textContent = data.forecast;
      });
    }
  );
});
