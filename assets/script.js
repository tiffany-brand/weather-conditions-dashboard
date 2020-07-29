$(document).ready(function () {

    const apiKey = "218bd26d3855488a6e6abc9f6a2091c0";

    // Selectors for HTML elements to display weather information
    const cityEl = $("h2#city");
    const dateEl = $("h2#date")
    const weatherIconEl = $("img#weather-icon");
    const temperatureEl = $("span#temperature");
    const humidityEl = $("span#humidity");
    const windEl = $("span#wind");
    const uvIndexEl = $("span#uv-index");



    function buildURL(city, state, country) {
        if (city && state && country) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}`
        } else if (city && country) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
        } else {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        };

    }

    function setUVIndexColor(uvi) {
        if (uvi < 3) {
            return "green";
        } else if (uvi >= 3 && uvi < 6) {
            return "yellow";
        } else if (uvi >= 6 && uvi < 8) {
            return "orange";
        } else if (uvi >= 8 && uvi < 11) {
            return "red";
        } else return "purple";
    };




    function searchWeather(city, state, country) {

        let queryURL = buildURL(city, state, country);
        console.log(queryURL);


        // Create an AJAX call to retrieve weather data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            cityEl.text(response.name)
            let formattedDate = moment.unix(response.dt).format("L");
            dateEl.text(formattedDate);
            let weatherIcon = response.weather[0].icon
            weatherIconEl.attr("src", `http://openweathermap.org/img/wn/${weatherIcon}.png`)
            temperatureEl.html(((response.main.temp - 273.15) * 1.8 + 32).toFixed(1))
            humidityEl.text(response.main.humidity);
            windEl.text((response.wind.speed * 2.237).toFixed(1));


            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let queryURLAll = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
            $.ajax({
                url: queryURLAll,
                method: "GET"
            }).then(function (response) {

                console.log(response);
                let uvIndex = response.current.uvi;
                let uvColor = setUVIndexColor(uvIndex);
                uvIndexEl.text(response.current.uvi);
                uvIndexEl.attr("style", `background-color: ${uvColor}`);
                let fiveDay = response.daily;
                for (let i = 0; i < 5; i++) {
                    let currDay = fiveDay[i]
                    console.log(moment.unix(currDay.dt).format("L"));
                    console.log("temp " + ((currDay.temp.day - 273.15) * 1.8 + 32).toFixed(1) + " degrees F");
                    console.log("humidity " + currDay.humidity + "%");
                    console.log(currDay.weather[0].icon);
                }
            })
        })
    }


    console.log($("#search-btn"));

    // Event handler for search button
    $("#search-btn").on("click", function (event) {
        // Preventing the button from trying to submit the form
        console.log(event);
        event.preventDefault();
        console.log("here")
        const cityInput = $("#city-input");
        const stateInput = $("#state-input");
        const countryInput = $("#country-input");

        // Storing the city, state, and country
        let city = cityInput.val().trim();
        city = city.replace(" ", "%20");

        let state = stateInput.val().trim();

        let country = countryInput.val().trim();

        // clear the input fields
        cityInput.val("");
        stateInput.val("");
        countryInput.val("");

        if (city) {
            // Run the searchWeather function(passing in the city, state, and country as an argument)
            // searchWeather(city, state, country);
            console.log("city " + city)
            console.log("state " + state)
            console.log("country " + country)
            searchWeather(city, state, country);

        }


    });




});