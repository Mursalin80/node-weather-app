console.log("Client side javascript is loaded!");

let searchForm = document.querySelector("#wsearch");
let input = document.querySelector("#loc");
let msg1 = document.querySelector("#msg1"),
  msg2 = document.querySelector("#msg2"),
  msg3 = document.querySelector("#msg3");

searchForm.addEventListener("submit", e => {
  e.preventDefault();

  msg1.textContent = "Loading weather...";
  let location = input.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        let text = `Temperature : ${data.Currently.apparentTemperature} <hr> humidity : ${data.Currently.humidity}`;
        msg1.textContent = data.Location;
        msg2.textContent = data.Address;
        msg3.innerHTML = text;
        console.log();
      }
    });
  });
});
