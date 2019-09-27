console.log("Client side javascript is loaded!");

let searchForm = document.querySelector("#wsearch");
let input = document.querySelector("#loc");
let msg1 = document.querySelector("#msg1"),
  msg2 = document.querySelector("#msg2"),
  msg3 = document.querySelector("#msg3");
(msg4 = document.querySelector("#msg4")),
  searchForm.addEventListener("submit", e => {
    e.preventDefault();

    msg1.textContent = "Loading weather...";
    let location = input.value;
    fetch(`/weather?address=${location}`).then(res => {
      res.json().then(data => {
        if (data.error) {
          msg1.textContent = data.error;
        } else {
          let {
            icon,
            pressure,
            visibility,
            dewPoint,
            apparentTemperature,
            humidity,
            windSpeed,
            temperature
          } = data.Currently;

          let text = `<hr>Apparent Temperature : ${apparentTemperature}C  Humidity : ${humidity}%`,
            text2 = `<hr>Icon: ${icon}<br> DewPoint : ${dewPoint}<br>Pressure : ${pressure}<br> Wind Speed : ${windSpeed}<br> visibility : ${visibility}<br> Temperature : ${temperature}<hr>`;
          msg1.textContent = data.Location;
          msg2.textContent = data.Address;
          msg3.innerHTML = text;
          msg4.innerHTML = text2;
          // console.log(data.Currently);
        }
      });
    });
  });
