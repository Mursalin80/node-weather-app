const request = require("request");
// const axios = require("axios");
// const chalk = require("chalk");

const geoRequest = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibXVyc2FsaW44MCIsImEiOiJjazB3aWl0czgwY3lrM21uMW1maGpndHR4In0.5sybSUyAeaRtKtghKXUvTw&limit=1`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to mlocation!");
    } else if (body.features.length === 0) {
      callback("Unable to find the location");
    } else {
      callback(null, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

// axios
//   .get(url)
//   .then(reasult => {
//     console.log(chalk.cyan.inverse("Weather Result from Dark sky API:"));

//     let data = reasult.data;
//     if (data) {
//       console.log(chalk.blue("timezone :"), data.timezone);
//       console.log(chalk.blue("humidity :"), data.currently.humidity + "%");
//       console.log(
//         chalk.blue("Current Temperature :"),
//         data.currently.temperature + "C"
//       );
//       console.log(chalk.blue("windSpeed :"), data.currently.windSpeed);
//       console.log(chalk.blue("dewPoint :"), data.currently.dewPoint + "C");
//     }
//   })
//   .catch(error => {
//     console.log(
//       chalk.cyan.inverse("Error from Dark sky API:"),
//       error.response.data.error
//     );
//   });

// let mapboxUrl =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/kundian.json?access_token=pk.eyJ1IjoibXVyc2FsaW44MCIsImEiOiJjazB3aWl0czgwY3lrM21uMW1maGpndHR4In0.5sybSUyAeaRtKtghKXUvTw&limit=1";

// axios.get(mapboxUrl).then(response => {
//   console.log(response.data.features[0].center);
// });

// request({ url: mapboxUrl, json: true }, (error, response) => {
//   if (error) {
//     console.log("Error :", error);
//   } else {
//   }
//   console.log(response.body.features);
// });

module.exports = {
  geoRequest: geoRequest
};
