const path = require('path');
const express = require('express');
const hbs = require('hbs');

const weather = require('./utils/weather');
const geocode = require('./utils/geocode');

// Define paths for express config
const app = express();
const port = process.env.PORT || 3000;
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'WeatherApp',
        name: 'Scott'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Scott'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Uh oh, something went horribly wrong!',
        title: 'Help',
        name: 'Scott'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'Please provide an address.'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                errorMessage: error
            });
        } else {
            weather(latitude, longitude, (error, {currentTemp, feelsLikeTemp, currentWeather}) => {
                if (error) {
                    return res.send({
                        errorMessage: error
                    });
                } else {
                    return res.send({
                        location,
                        currentWeather,
                        currentTemp
                    });
                }
            });
        }
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'No help for this topic exists.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found.'
    })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});