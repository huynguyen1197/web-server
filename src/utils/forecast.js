const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1f563217ff82b79f4b76fc8b3badacaf&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to get service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const mes = body.current.temperature + " degrees outside. Weather is " + body.current.weather_descriptions[0]
      callback(undefined, mes);
    }
  });
};

module.exports = forecast;
