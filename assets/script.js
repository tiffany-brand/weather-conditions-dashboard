$(document).ready(function () {
    const apiKey = '218bd26d3855488a6e6abc9f6a2091c0';

    // Selectors for HTML elements to display weather information
    const cityEl = $('h2#city');
    const dateEl = $('h2#date');
    const weatherIconEl = $('img#weather-icon');
    const temperatureEl = $('span#temperature');
    const humidityEl = $('span#humidity');
    const windEl = $('span#wind');
    const uvIndexEl = $('span#uv-index');
    const fiveDayEl = $('div.fiveDay');
    const cityListEl = $('div.cityList');

    // Store past searched cities
    let pastCities = [];

    // local storage functions for past searched cities

    // loads events from local storage
    function loadCities() {
        const storedCities = JSON.parse(localStorage.getItem('pastCities'));
        if (storedCities) {
            pastCities = storedCities;
        }
    }



    // store past searched cities in local storage
    function storeCities() {
        localStorage.setItem('pastCities', JSON.stringify(pastCities));
    }

    function buildURLFromInputs(city, state, country) {
        if (city && state && country) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}`;
        } else if (city && country) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
        } else {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        }
    }

    function buildURLFromId(id) {
        return `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`;
    }

    function displayCities(pastCities) {
        cityListEl.empty();
        pastCities.forEach(function (location) {
            let cityDiv = $('<div>').addClass('col-12 city');
            let cityBtn = $('<button>').addClass('btn btn-light city-btn').text(location.city);
            cityDiv.append(cityBtn);
            cityListEl.append(cityDiv);
        });
    }

    function setUVIndexColor(uvi) {
        if (uvi < 3) {
            return 'green';
        } else if (uvi >= 3 && uvi < 6) {
            return 'yellow';
        } else if (uvi >= 6 && uvi < 8) {
            return 'orange';
        } else if (uvi >= 8 && uvi < 11) {
            return 'red';
        } else return 'purple';
    }

    function searchWeather(queryURL) {
        // let queryURL = buildURL(city, state, country);
        console.log(queryURL);
        // Create an AJAX call to retrieve weather data
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);

            // Store current city in past cities
            let city = response.name;
            let id = response.id;

            if (pastCities[0]) {
                pastCities = $.grep(pastCities, function (storedCity) {
                    return id !== storedCity.id;
                })
            }
            pastCities.unshift({ city, id });
            storeCities();
            displayCities(pastCities);

            // display current weather in DOM
            cityEl.text(response.name);
            let formattedDate = moment.unix(response.dt).format('L');
            dateEl.text(formattedDate);
            let weatherIcon = response.weather[0].icon;
            weatherIconEl.attr('src', `http://openweathermap.org/img/wn/${weatherIcon}.png`);
            temperatureEl.html(((response.main.temp - 273.15) * 1.8 + 32).toFixed(1));
            humidityEl.text(response.main.humidity);
            windEl.text((response.wind.speed * 2.237).toFixed(1));

            // Call Openweather with lat and lon to get the UV index and 5 day forecast
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let queryURLAll = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            $.ajax({
                url: queryURLAll,
                method: 'GET'
            }).then(function (response) {
                console.log(response);
                let uvIndex = response.current.uvi;
                let uvColor = setUVIndexColor(uvIndex);
                uvIndexEl.text(response.current.uvi);
                uvIndexEl.attr('style', `background-color: ${uvColor}; color: ${uvColor === "yellow" ? "black" : "white"}`);
                let fiveDay = response.daily;
                for (let i = 0; i <= 5; i++) {
                    let currDay = fiveDay[i];
                    $(`div.day-${i} .card-title`).text(moment.unix(currDay.dt).format('L'));
                    $(`div.day-${i} .fiveDay-img`).attr(
                        'src',
                        `http://openweathermap.org/img/wn/${currDay.weather[0].icon}.png`
                    );
                    $(`div.day-${i} .fiveDay-temp`).text(((currDay.temp.day - 273.15) * 1.8 + 32).toFixed(1));
                    $(`div.day-${i} .fiveDay-humid`).text(currDay.humidity);
                }
            });
        });
    }

    // function to display the last city searched on page load

    function displayLastSearchedCity() {

        if (pastCities[0]) {
            let queryURL = buildURLFromId(pastCities[0].id);
            searchWeather(queryURL);
        } else {
            let queryURL = buildURLFromInputs("Boston", "MA", "US");
            searchWeather(queryURL);
        }

    }



    // Click handler for search button
    $('#search-btn').on('click', function (event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        const cityInput = $('#city-input');
        const stateInput = $('#state-input');
        const countryInput = $('#country-input');

        // Storing the city, state, and country
        let city = cityInput.val().trim();
        city = city.replace(' ', '%20');

        let state = stateInput.val().trim();

        let country = countryInput.val().trim();

        // clear the input fields
        cityInput.val('');
        stateInput.val('');
        countryInput.val('');

        if (city) {
            let queryURL = buildURLFromInputs(city, state, country);
            // Run the searchWeather function(passing in the city, state, and country as an argument)
            searchWeather(queryURL);
        }
    });

    // Click handler for city buttons

    $(document).on("click", "button.city-btn", function (event) {
        let clickedCity = $(this).text();
        let foundCity = $.grep(pastCities, function (storedCity) {
            console.log(storedCity.city);
            return clickedCity === storedCity.city;
        })
        console.log(foundCity);
        let queryURL = buildURLFromId(foundCity[0].id)
        searchWeather(queryURL);
    });


    // Initialization - when page loads

    // load any cities in local storage into array
    loadCities();
    displayCities(pastCities);

    // Display weather for last searched city
    displayLastSearchedCity();





});
