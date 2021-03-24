const request = require('request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoic2RuaWNob2xzIiwiYSI6ImNrazJtMWtnZDEyZTQycW1mejB2eDJ2MGUifQ.0-4vLM-AqKBPCGI6CiugXA`
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Could not connect to Mapbox API. Please check your network connection, or try again later.', undefined);
        } else if (body.features.length == 0) {
            callback('No results for this search term, please try again', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            });
        }
    });
}

module.exports = geocode;