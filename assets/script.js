$(document).ready(function () {

    const apiKey = "218bd26d3855488a6e6abc9f6a2091c0";

    // Selectors for HTML elements to display weather information
    const cityEl = $("h2#city");
    const dateEl = $("h2#date")
    const weatherIconEl = $("img#weather-icon");


    function buildURL(city, state, country) {
        if (city && state && country) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}`
        } else if (city && country) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
        } else {
            return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        };

    }




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