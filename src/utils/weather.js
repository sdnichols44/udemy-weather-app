const request = require('request');

const weather = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3114065979183b046a00e3da4eeae82f&query=${latitude},${longitude}`;
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Could not connect to the Weatherstack API. Please check your network connection, or try again later.', undefined);
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                currentTemp: body.current.temperature,
                feelsLikeTemp: body.current.feelslike,
                currentWeather: body.current.weather_descriptions
            });
        }
    });
}

module.exports = weather;